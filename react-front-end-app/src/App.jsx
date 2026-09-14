import { Routes, Route } from "react-router-dom";
import "./App.css";
import usePersistentState from "./usePersistentState";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageLoader from "./components/PageLoader/PageLoader";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import Budget from "./pages/Budget/Budget";
import Transactions from "./pages/Transactions/Transactions";
import mockTransactions, { budgetLimits as defaultBudgetLimits } from "./Database/MockData";

function App() {
  const [transactions, setTransactions] = usePersistentState("transactions", mockTransactions);
  const [budgetLimits, setBudgetLimits] = usePersistentState("budgetLimits", defaultBudgetLimits);
  const [budgetPeriod, setBudgetPeriod] = usePersistentState("budgetPeriod", "Monthly");

  return (
    <div className="app-shell">
      <PageLoader />
      <Header />

      <div className="app-content">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              // This sends the transaction data to the Dashboard component as a prop.
              element={<Dashboard transactions={transactions} />}
            />
            <Route
              path="/budget"
              element={
                <Budget
                  transactions={transactions}
                  budgetLimits={budgetLimits}
                  setBudgetLimits={setBudgetLimits}
                  budgetPeriod={budgetPeriod}
                  setBudgetPeriod={setBudgetPeriod}
                />
              }
            />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}  //Current list.
                  setTransactions={setTransactions}  //Saves the updated data to sessionStorage.
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
