import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function SignUpPage() {
  const [signupError, setSignupError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

      form.reset();
      navigate("/login");
    } catch (error) {
      setSignupError(error.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-kicker">Start today</p>
        <h1>Create an account</h1>

        <form className="auth-form" onSubmit={handleSignUpSubmit}>
          <label className="auth-field">
            <span>Email address</span>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input type="password" name="password" placeholder="Create a password" autoComplete="new-password" required />
          </label>

          <label className="auth-field">
            <span>Confirm password</span>
            <input type="password" name="confirmPassword" placeholder="Confirm your password" autoComplete="new-password" required />
          </label>

          {signupError && <p className="auth-error">{signupError}</p>}

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
