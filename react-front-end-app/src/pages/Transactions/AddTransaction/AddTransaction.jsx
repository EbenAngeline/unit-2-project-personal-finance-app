import { useEffect, useState } from "react";
import "./AddTransaction.css";
import Button from "../../../components/Button/Button";

function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const expenseCategories = ["Groceries", "Utilities", "Rent", "Transportation", "Entertainment"];
const incomeCategories = ["Salary", "Investment"];

function AddTransaction({
  transactions = [],       //Current list of transactions.
  setTransactions,       //Function used to update the transaction list.
  currentUser,
  onClose,                   //Function that closes the popup or modal.
  editingTransaction = null,   //If adding a new one: If editing an existing transaction, this contains its data.
}) {
  const isEditing = Boolean(editingTransaction);
  const userId = currentUser?.userId ?? currentUser?.id ?? currentUser?.user?.id ?? null;
  const todayISO = getTodayISO();
  const [transactionType, setTransactionType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayISO);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!editingTransaction) {
      setTransactionType("Expense");
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(todayISO);
      return;
    }

    setTransactionType(editingTransaction.amount < 0 ? "Expense" : "Income");
    setAmount(String(Math.abs(editingTransaction.amount)));
    setCategory(editingTransaction.category ?? "");
    setDescription(editingTransaction.description ?? "");
    setDate(editingTransaction.date ? editingTransaction.date.slice(0, 10) : todayISO);
  }, [editingTransaction, todayISO]);

  const categoryOptions =
    transactionType === "Expense" ? expenseCategories : incomeCategories;
  const handleSubmit = async (event) => {
    event.preventDefault();             //Normally forms refresh the page.This stops that behavior.

    const safeDate = date || todayISO;
    const numericAmount = Math.abs(Number(amount)); //Number() converts it into
    const signedAmount =
      transactionType === "Expense" ? -numericAmount : numericAmount;
    const details = {
      date: safeDate,
      description,
      category,
      amount: signedAmount,
    };

    if (isEditing) {
      if (!userId) {
        setSubmitError("You must be logged in to update a transaction.");
        return;
      }

      try {
        setIsSubmitting(true);
        setSubmitError("");

        const response = await fetch(`/api/transactions/${editingTransaction.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...details,
            userId: userId,
            date: `${safeDate}T00:00:00`,
          }),
        });

        const updatedTransaction = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(updatedTransaction?.message || "Unable to update transaction.");
        }

        const normalizedTransaction = {
          ...(updatedTransaction || {}),
          date: updatedTransaction?.date ? updatedTransaction.date.slice(0, 10) : safeDate,
          description: updatedTransaction?.description ?? description ?? "N/A",
          amount: Number(updatedTransaction?.amount ?? signedAmount),
        };

        setTransactions(
          transactions.map((transaction) =>
            transaction.id === editingTransaction.id
              ? normalizedTransaction
              : transaction,
          ),
        );
      } catch (error) {
        setSubmitError(error.message || "Unable to update transaction.");
        return;
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!userId) {
        setSubmitError("You must be logged in to add a transaction.");
        return;
      }

      try {
        setIsSubmitting(true);
        setSubmitError("");

        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...details,
            userId: userId,
            date: `${safeDate}T00:00:00`,
          }),
        });
        const createdExpense = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(createdExpense?.message || "Unable to save transaction.");
        }

        setTransactions([
          {
            ...(createdExpense || {}),
            date: createdExpense?.date ? createdExpense.date.slice(0, 10) : safeDate,
            description: createdExpense?.description ?? description ?? "N/A",
            amount: Number(createdExpense?.amount ?? signedAmount),
          },
          ...transactions,
        ]);
      } catch (error) {
        setSubmitError(error.message || "Unable to save transaction.");
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    onClose();    //Close the Form
  };
  return (
    <div className="container">
      <div className="add-transaction">
        <h2>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>
        <p>
          {isEditing
            ? "Update the details for this transaction"
            : "Enter the details below to log a new transaction"}
        </p>
        {submitError && <p className="auth-error">{submitError}</p>}

        <form className="transaction-form" onSubmit={handleSubmit}>
          <label className="field-label">Transaction Type</label>
          <div className="radio-buttons">
            <label
              className={`radio-button ${transactionType === "Expense" ? "active" : ""}`}
            >
              <input
                type="radio"
                value="Expense"
                name="transactionType"
                checked={transactionType === "Expense"}
                onChange={() => setTransactionType("Expense")}
              />
              <span>Expense</span>
            </label>

            <label
              className={`radio-button ${transactionType === "Income" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="transactionType"
                value="Income"
                checked={transactionType === "Income"}
                onChange={() => setTransactionType("Income")}
              />
              <span>Income</span>
            </label>
          </div>

          <div className="form-grid">
            <div className="field-group amount">
              <label htmlFor="amount" className="field-label">
                Amount
              </label>
              <div className="input-with-icon">
                <span className="symbol">$</span>
                <input
                  type="number"
                  id="amount"
                  min="0.01" //Cannot enter zero or negative values.
                  step="0.01"  //Allows decimal amounts.
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter the Amount"
                />
              </div>
              <p className="helper-text">
                Amounts are always entered as positive numbers.
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="category" className="field-label">
                Category
              </label>
              <select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group description">
              <label htmlFor="description" className="field-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                required
                value={description}  //This tells React which option should currently be selected.
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g Whole Foods Market"
              />
            </div>

            <div className="field-group date">
              <label htmlFor="date" className="field-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                required
                max={todayISO}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-action">
            <Button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="save-button" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddTransaction;
