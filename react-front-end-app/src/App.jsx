import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageLoader from "./components/PageLoader/PageLoader";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Budget from "./pages/Budget/Budget";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState({});
  const [budgetPeriod, setBudgetPeriod] = useState("Monthly");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    const nextUser = user ?? { email: "user@example.com" };
    setBudgetLimits({});
    setBudgetPeriod("Monthly");
    setCurrentUser(nextUser);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setBudgetLimits({});
    setBudgetPeriod("Monthly");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="app-shell">
      <PageLoader />
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="app-content">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/dashboard"
              element={<Dashboard currentUser={currentUser} />}
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
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}  //Current list.
                  setTransactions={setTransactions}  //Saves the updated data to sessionStorage.
                  currentUser={currentUser}
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
