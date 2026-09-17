import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Budget.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import BudgetSettingsForm from "./BudgetSettingsForm";
import BudgetCategoryForm from "./BudgetCategoryForm";

function toPercent(part, whole) {
  if (whole <= 0) return 0;
  return Math.min(Math.round((part / whole) * 100), 100);
}

function getUsageLevel(usagePercent, isOver) {
  if (isOver || usagePercent >= 100) return "danger";
  if (usagePercent >= 70) return "warning";
  return "normal";
}

const BudgetCategory = ({
  categoryName,
  limit,
  spent,
  remaining,
  onSelect,
  onEdit,
}) => {
  const isOverBudget = remaining < 0;
  const isUnderBudget = remaining > 0;
  const usagePercent = toPercent(spent, limit);
  const remainingPercent = Math.max(100 - usagePercent, 0);
  const usageLevel = getUsageLevel(usagePercent, isOverBudget);

  return (
    <div
      className="budget-category"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(categoryName)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(categoryName);
        }
      }}
    >
      <div className="category-title">
        <h3>{categoryName}</h3>
        <button
          type="button"
          className="edit-category-btn"
          aria-label={`Edit ${categoryName} limit`}
          onClick={(e) => {
            e.stopPropagation(); //Stop the click from also triggering the card's navigate handler.
            onEdit(categoryName);
          }}
        >
          ✎
        </button>
      </div>
      <div className="category-detail">
        <div className="detail">
          <span className="label">Limit</span>
          <span className="value">${limit.toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="label">Spent</span>
          <span className="value">${spent.toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="label">Remaining</span>
          <span className="value">${remaining.toLocaleString()}</span>
        </div>
      </div>
      <div className="category-status">
        {isOverBudget && (
          <span className="status-over">
            Over by: ${Math.abs(remaining).toLocaleString()}
          </span>
        )}
        {isUnderBudget && (
          <span className={`status-remaining status-remaining--${usageLevel}`}>
            {remainingPercent}% remaining
          </span>
        )}
      </div>
      <div className="progress-track">
        <div
          className={`progress-bar progress-bar--${usageLevel}`}
          style={{ width: `${usagePercent}%` }}
        ></div>
      </div>
    </div>
  );
};

const normalizeBudgetLimits = (payload) => {
  if (!payload || typeof payload !== "object") return {};

  const toEntries = (value) => {
    if (!value || typeof value !== "object") return [];

    if (Array.isArray(value)) {
      return value.map((item) => {
        const name = item?.name ?? item?.category ?? item?.categoryName ?? item?.label;
        const amount = Number(item?.amount ?? item?.limit ?? item?.budget ?? item?.value ?? 0);
        return [name, Number.isFinite(amount) ? amount : 0];
      }).filter(([name]) => Boolean(name));
    }

    return Object.entries(value).map(([key, val]) => {
      if (val && typeof val === "object") {
        const name = val.name ?? val.category ?? val.categoryName ?? val.label ?? key;
        const amount = Number(val.amount ?? val.limit ?? val.budget ?? val.value ?? 0);
        return [name, Number.isFinite(amount) ? amount : 0];
      }

      const amount = Number(val ?? 0);
      return [key, Number.isFinite(amount) ? amount : 0];
    });
  };

  const candidateCollections = [
    payload.budget,
    payload.budgetLimits,
    payload.budgets,
    payload.categories,
    payload.data,
    payload.items,
    payload,
  ];

  for (const collection of candidateCollections) {
    if (!collection || typeof collection !== "object") continue;

    const entries = toEntries(collection);
    const filteredEntries = entries.filter(([name, value]) => Boolean(name) && Number.isFinite(Number(value)));

    if (filteredEntries.length > 0) {
      return filteredEntries.reduce((acc, [name, value]) => {
        acc[name] = Number(value);
        return acc;
      }, {});
    }
  }

  return {};
};

const getBudgetEndpointCandidates = (userId) => [
  `/api/budgets/user/${userId}`,
];

const fetchBudgetApi = async (userId, init) => {
  const candidates = getBudgetEndpointCandidates(userId);
  let lastError = null;

  for (const url of candidates) {
    try {
      const response = await fetch(url, init);
      if (response.ok) {
        return response;
      }

      if (response.status !== 404 && response.status !== 405) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || "Unable to reach budget endpoint.");
      }

      lastError = new Error(`Budget endpoint unavailable at ${url}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load budget.");
};

const BudgetManagement = ({
  transactions,
  budgetLimits,
  setBudgetLimits,
  budgetPeriod,
  setBudgetPeriod,
  currentUser,
}) => {
  const navigate = useNavigate();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const userId = currentUser?.userId ?? currentUser?.id ?? currentUser?.user?.id ?? null;

  useEffect(() => {
    if (!userId) {
      setBudgetLimits({});
      return;
    }

    let isCancelled = false;

    const getBudget = async () => {
      try {
        const response = await fetchBudgetApi(userId);
        const payload = await response.json().catch(() => ({}));
        if (isCancelled) return;

        const nextBudgetLimits = normalizeBudgetLimits(payload);
        if (payload?.budgetPeriod || payload?.period) {
          const nextPeriod = payload.budgetPeriod || payload.period;
          setBudgetPeriod(nextPeriod);
        }

        setBudgetLimits(nextBudgetLimits);
      } catch (error) {
        console.error(error);
        if (!isCancelled) {
          setBudgetLimits({});
        }
      }
    };

    getBudget();

    return () => {
      isCancelled = true;
    };
  }, [userId, setBudgetLimits]);

  const budgetCategories = Object.entries(budgetLimits).map(([name, limit]) => {
    const expenses = transactions.filter(
      (transaction) =>
        transaction.category === name && transaction.amount < 0,
    );
    const spent = expenses.reduce(
      (total, transaction) => total + Math.abs(transaction.amount),
      0,
    );
    const remaining = limit - spent;

    return { name, limit, spent, remaining };
  });

  const totalBudget = budgetCategories.reduce((sum, item) => sum + item.limit, 0); //Always the sum of every category's limit.
  const totalSpent = budgetCategories.reduce(
    (sum, item) => sum + item.spent,
    0,
  );
  const overallProgress = toPercent(totalSpent, totalBudget);
  const overallLevel = getUsageLevel(overallProgress, totalSpent > totalBudget);

  const handleSelectCategory = (name) => {
    navigate(`/transactions?category=${encodeURIComponent(name)}`);
  };

  const handleSaveSettings = (nextPeriod) => {
    setBudgetPeriod(nextPeriod);
    setIsSettingsModalOpen(false);
  };

  const handleSaveCategoryLimit = async (nextLimit) => {
    if (!userId || !editingCategory) {
      setEditingCategory(null);
      return;
    }

    try {
      const response = await fetchBudgetApi(userId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: editingCategory,
          amount: Number(nextLimit),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      const nextBudgetLimits = normalizeBudgetLimits(payload);
      setBudgetLimits(
        Object.keys(nextBudgetLimits).length > 0
          ? nextBudgetLimits
          : { ...budgetLimits, [editingCategory]: Number(nextLimit) },
      );
    } catch (error) {
      console.error(error);
      setBudgetLimits({ ...budgetLimits, [editingCategory]: Number(nextLimit) });
    } finally {
      setEditingCategory(null);
    }
  };

  return (
    <div className="budget-page">
      <section className="page-header">
        <h1>Budget</h1>
        <h3 className="page-subtitle">
          {" "}
          A simple view of your monthly limits and spending progress.
        </h3>
      </section>

      <section className="budget-summary">
        <div className="summary-item">
          <span className="label">Total Monthly Budget</span>
          <span className="value">${totalBudget.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="label">Budget period</span>
          <span className="value">{budgetPeriod}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total spent</span>
          <span className="value">
            ${totalSpent.toLocaleString()} ({overallProgress}%)
          </span>
        </div>
        <div className="summary-overall">
          <span className="label">Overall progress</span>
          <div className="progress-track">
            <div
              className={`progress-bar progress-bar--${overallLevel}`}
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        <div className="summary-edit">
          <Button
            type="button"
            className="edit-settings-btn"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            Edit budget settings
          </Button>
        </div>
      </section>

      <section className="budget-section">
        <div className="section-title-row">
          <h2>Budget categories</h2>
        </div>
        <div className="categories">
          {budgetCategories.map((cat) => (
            <BudgetCategory
              key={cat.name}
              categoryName={cat.name}
              limit={cat.limit}
              spent={cat.spent}
              remaining={cat.remaining}
              onSelect={handleSelectCategory}
              onEdit={setEditingCategory}
            />
          ))}
        </div>
      </section>

      {isSettingsModalOpen && (
        <Modal onClose={() => setIsSettingsModalOpen(false)}>
          <BudgetSettingsForm
            budgetPeriod={budgetPeriod}
            onSave={handleSaveSettings}
            onClose={() => setIsSettingsModalOpen(false)}
          />
        </Modal>
      )}

      {editingCategory && (
        <Modal onClose={() => setEditingCategory(null)}>
          <BudgetCategoryForm
            categoryName={editingCategory}
            limit={budgetLimits[editingCategory]}
            onSave={handleSaveCategoryLimit}
            onClose={() => setEditingCategory(null)}
          />
        </Modal>
      )}
    </div>
  );
};
export default BudgetManagement;
