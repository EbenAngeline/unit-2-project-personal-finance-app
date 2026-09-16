import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Transaction.css";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import AddTransaction from "./AddTransaction/AddTransaction";
import Button from "../../components/Button/Button";

function buildColumns(onEdit, onDelete) {
  return [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "category", label: "Category" },
    {
      key: "amount",
      label: "Amount",
      cellClassName: (transaction) =>
        transaction.amount >= 0 ? "income-amount" : "expense-amount",
      render: (transaction) => transaction.amount.toFixed(2),
    },
    {
      key: "actions",
      label: "Actions",
      render: (transaction) => (
        <div className="row-actions">
          <Button
            type="button"
            className="row-action-btn" //General button styling.
            onClick={() => onEdit(transaction)} //run immediately while the page is rendering.
          >
            Edit
          </Button>
          <Button
            type="button"
            className="row-action-btn row-action-btn--danger"
            onClick={() => onDelete(transaction)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
}

function Transactions({ transactions, setTransactions, currentUser }) {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "All categories", //Lets Budget deep-link straight to a filtered view.
  );
  const [sortBy, setSortBy] = useState("Date");

  useEffect(() => {
    if (!currentUser?.userId) {
      setTransactions([]);
      return;
    }

    let isCancelled = false;

    const getTransactionsForUser = async () => {
      try {
        const response = await fetch(
          `/api/transactions?userId=${currentUser.userId}`,
        );

        if (!response.ok) {
          throw new Error("Unable to load transactions.");
        }

        const transactionsFromDb = await response.json();
        if (isCancelled) return;

        setTransactions(
          transactionsFromDb.map((transaction) => ({
            ...transaction,
            date: transaction.date?.slice(0, 10) ?? "",
            description: transaction.description ?? "N/A",
            amount: Number(transaction.amount),
          })),
        );
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
          setTransactions([]);
        }
      }
    };

    getTransactionsForUser();

    return () => {
      isCancelled = true;
    };
  }, [currentUser?.userId, setTransactions]);

  const categoryFromLink = searchParams.get("category");
  const categories = [
    "All categories",
    ...new Set([
      ...(categoryFromLink ? [categoryFromLink] : []), //Keep the deep-linked category selectable even if it has no transactions yet.
      ...transactions.map((transaction) => transaction.category), //This creates the dropdown list of categories automatically.
    ]),
  ]; //A Set removes duplicate values.

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  const handleDelete = (transaction) => {
    setDeletingTransaction(transaction);
  };
  const handleCancelDelete = () => {
    setDeletingTransaction(null);
  };
  const handleConfirmDelete = () => {
    setTransactions(transactions.filter((t) => t.id !== deletingTransaction.id));
    setDeletingTransaction(null);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const filteredTransactions = transactions.filter((transaction) => { //This creates a new array containing only the transactions that match the user's search and filter choices.
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All categories" ||
      transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "Amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date); // Newest dates first
  });

  const columns = buildColumns(handleEdit, handleDelete);

  return ( //rendering
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
            <h3 className="page-subtitle">A simple view of your income, expenses, and activity.</h3>
        </div>
        <Button className="add-btn" onClick={handleAdd}>
          + Add transaction
        </Button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="sort">
          <label>Sort</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Date">Date</option>
            <option value="Amount">Amount</option>
          </select>
        </div>
      </div>

      <div className="transaction-card">
        <Table
          className="transaction-table"
          columns={columns}
          rows={sortedTransactions} //it displays the filtered and sorted results.
          getRowKey={(transaction) => transaction.id} //React requires each row in a list to have a unique key.
          emptyMessage="No transactions match your filters."
        />
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AddTransaction
            transactions={transactions}
            setTransactions={setTransactions}
            currentUser={currentUser}
            onClose={handleCloseModal}
            editingTransaction={editingTransaction} //null → create a new transaction.
          />
        </Modal>
      )}

      {deletingTransaction && (
        <Modal onClose={handleCancelDelete} className="delete-confirm">
          <h2>Delete transaction</h2>
          <p>
            Delete "{deletingTransaction.description}"? This cannot be
            undone.
          </p>
          <div className="form-action">
            <Button
              type="button"
              className="cancel-button"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="save-button row-action-btn--danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Transactions;
