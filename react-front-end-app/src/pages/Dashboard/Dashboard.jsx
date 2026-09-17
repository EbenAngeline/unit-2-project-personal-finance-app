import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Table from "../../components/Table/Table";

function renderPill(value) { //shared by the category and type columns below
  return <span className={`type-pill ${value.toLowerCase()}`}>{value}</span>;
}

const activityColumns = [
  { key: "description", label: "Description" },
  {
    key: "category",    //look for the category property
    label: "Category",   //display category in the table header
    render: (transaction) => renderPill(transaction.category),  //the current row of object is passed in to the function(uses custom render fn)
  },
  {
    key: "amount",
    label: "Amount",
    cellClassName: (transaction) =>
      `amount-cell ${transaction.amount >= 0 ? "income" : "expense"}`,
    render: (transaction) => `$${Math.abs(transaction.amount).toFixed(2)}`,
  },
];

function Dashboard({ currentUser }) {
  const [transactions, setTransactions] = useState([]);
  const userId = currentUser?.userId ?? currentUser?.id ?? currentUser?.user?.id ?? null;

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      return;
    }

    let isCancelled = false;

    const getTransactionsForUser = async () => {
      try {
        const response = await fetch(
          `/api/transactions?userId=${userId}`,
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
  }, [userId]);

  const totalIncome = transactions    //keeps only income
    .filter((item) => item.amount >= 0)
    .reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = transactions
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);
  const currentBalance = totalIncome - totalExpenses;
  const recentTransactions = [...transactions]      //create a copy of the array.it changes the orginal array
    .sort((a, b) => new Date(b.date) - new Date(a.date))   //Converts dates into Date objects.Newest comes first
    .slice(0, 3);  //Keeps only the three latest transactions.

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <h1>Dashboard</h1>
          <h3 className="hero-text">
            A simple view of your balance and recent transactions.
          </h3>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="box">
          <p className="box-label">Balance</p>
          <h2 className={currentBalance >= 0 ? "positive" : "negative"}>
            ${currentBalance.toLocaleString()}
          </h2>
        </article>
        <article className="box">
          <p className="box-label">Expenses</p>
          <h2>${totalExpenses.toLocaleString()}</h2>
        </article>
        <article className="box">
          <p className="box-label">Income</p>
          <h2>${totalIncome.toLocaleString()}</h2>
        </article>
      </section>

      <section className="transaction-card">
        <div className="transaction-card-header">
          <h2>Recent activity</h2>
          <Link className="view-all-link" to="/transactions">
            View all
          </Link>
        </div>

        <Table
          className="activity-table"
          columns={activityColumns}
          rows={recentTransactions}// data to display
          getRowKey={(transaction) => transaction.id}//Every React list needs a unique key.
          emptyMessage="No recent activity yet."
        />
      </section>
    </div>
  );
}
export default Dashboard;
