import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginPage({ onLogin }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const clearAuthForm = () => {
    const form = document.querySelector(".auth-card form");
    if (form) {
      form.reset();
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (onLogin) onLogin();
    clearAuthForm();
    navigate("/dashboard");
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    setSignupError("");
    clearAuthForm();
    setShowSignUp(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {showSignUp ? (
          <>
            <p className="auth-kicker">Start today</p>
            <h1>Create an account</h1>

            <form className="auth-form" onSubmit={handleSignUpSubmit}>
              <label className="auth-field">
                <span>Username</span>
                <input type="text" name="username" placeholder="Choose a username" autoComplete="off" defaultValue="" />
              </label>

              <label className="auth-field">
                <span>Email</span>
                <input type="email" name="email" placeholder="Enter your email" autoComplete="off" defaultValue="" />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input type="password" name="password" placeholder="Create a password" autoComplete="new-password" defaultValue="" />
              </label>

              <label className="auth-field">
                <span>Confirm password</span>
                <input type="password" name="confirmPassword" placeholder="Confirm your password" autoComplete="new-password" defaultValue="" />
              </label>

              {signupError && <p className="auth-error">{signupError}</p>}

              <button type="submit" className="auth-button">
                Create account
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <button type="button" className="auth-link-button" onClick={() => {
                clearAuthForm();
                setShowSignUp(false);
              }}>Log in</button>
            </p>
          </>
        ) : (
          <>
            <p className="auth-kicker">Welcome back</p>
            <h1>Log in</h1>

            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <label className="auth-field">
                <span>Username</span>
                <input type="text" name="username" placeholder="Enter your username" autoComplete="off" defaultValue="" />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input type="password" name="password" placeholder="Enter your password" autoComplete="current-password" defaultValue="" />
              </label>

              <div className="auth-row">
                <label className="checkbox-label">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
              </div>

              <button type="submit" className="auth-button">
                Sign in
              </button>
            </form>

            <p className="auth-switch">
              Need an account? <button type="button" className="auth-link-button" onClick={() => {
                clearAuthForm();
                setShowSignUp(true);
              }}>Create one</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
