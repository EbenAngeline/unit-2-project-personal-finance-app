import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

  const getUserId = (user) => user?.userId ?? user?.id ?? user?.user?.id ?? null;

  const readStoredUser = () => {
    try {
      const savedUser = sessionStorage.getItem("currentUser");
      if (!savedUser) return null;
      const parsedUser = JSON.parse(savedUser);
      const normalizedUser = parsedUser && getUserId(parsedUser) ? { ...parsedUser, userId: getUserId(parsedUser) } : null;
      return normalizedUser;
    } catch {
      return null;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = sessionStorage.getItem("isLoggedIn");
    return saved ? JSON.parse(saved) : false;
  });
  const [currentUser, setCurrentUser] = useState(readStoredUser);

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(Boolean(isLoggedIn && currentUser?.userId)));
    if (currentUser?.userId) {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem("currentUser");
    }
  }, [isLoggedIn, currentUser]);

  const normalizeUser = (user) => {
    const userId = getUserId(user);
    return user && userId ? { ...user, userId } : null;
  };

  const handleLogin = (user) => {
    const normalizedUser = normalizeUser(user);

    setTransactions([]);
    setBudgetLimits({});
    setBudgetPeriod("Monthly");
    setCurrentUser(normalizedUser);
    setIsLoggedIn(Boolean(normalizedUser?.userId));
  };

  const handleLogout = () => {
    setTransactions([]);
    setBudgetLimits({});
    setBudgetPeriod("Monthly");
    setCurrentUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("isLoggedIn");
  };

  const requireAuth = (element) =>
    isLoggedIn && currentUser?.userId ? element : <Navigate to="/login" replace />;

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
              element={requireAuth(<Dashboard currentUser={currentUser} />)}
            />
            <Route
              path="/budget"
              element={requireAuth(
                <Budget
                  transactions={transactions}
                  budgetLimits={budgetLimits}
                  setBudgetLimits={setBudgetLimits}
                  budgetPeriod={budgetPeriod}
                  setBudgetPeriod={setBudgetPeriod}
                  currentUser={currentUser}
                />,
              )}
            />
            <Route
              path="/transactions"
              element={requireAuth(
                <Transactions
                  transactions={transactions}
                  setTransactions={setTransactions}
                  currentUser={currentUser}
                />,
              )}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
