import { Link } from "react-router-dom";
import "./Auth.css";

function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-kicker">Start today</p>
        <h1>Create an account</h1>

        <form className="auth-form">
          <label className="auth-field">
            <span>Full name</span>
            <input type="text" name="name" placeholder="Jane Doe" />
          </label>

          <label className="auth-field">
            <span>Email address</span>
            <input type="email" name="email" placeholder="you@example.com" />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input type="password" name="password" placeholder="Create a password" />
          </label>

          <label className="auth-field">
            <span>Confirm password</span>
            <input type="password" name="confirmPassword" placeholder="Confirm your password" />
          </label>

          <button type="submit" className="auth-button">
            Create account
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
