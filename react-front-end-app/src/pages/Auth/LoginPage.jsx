import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginPage({ onLogin }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const clearAuthForm = () => {
    const form = document.querySelector(".auth-card form");
    if (form) {
      form.reset();
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setLoginError("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setLoginError("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      const user = {
        email,
        userId: data.userId ?? null,
      };

      if (onLogin) onLogin(user);
      clearAuthForm();
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.message || "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!email || !password) {
      setSignupError("Email and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSignupError("");

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to create your account.");
      }

      clearAuthForm();
      setShowSignUp(false);
    } catch (error) {
      setSignupError(error.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
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
                <span>Email</span>
                <input type="email" name="email" placeholder="Enter your email" autoComplete="email" defaultValue="" required />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input type="password" name="password" placeholder="Create a password" autoComplete="new-password" defaultValue="" required />
              </label>

              <label className="auth-field">
                <span>Confirm password</span>
                <input type="password" name="confirmPassword" placeholder="Confirm your password" autoComplete="new-password" defaultValue="" required />
              </label>

              {signupError && <p className="auth-error">{signupError}</p>}

              <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
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
                <span>Email</span>
                <input type="email" name="email" placeholder="Enter your email" autoComplete="email" defaultValue="" required />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input type="password" name="password" placeholder="Enter your password" autoComplete="current-password" defaultValue="" required />
              </label>

              <div className="auth-row">
                <label className="checkbox-label">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
              </div>

              {loginError && <p className="auth-error">{loginError}</p>}

              <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
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
