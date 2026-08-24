import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import "./admin.css";

function AdminLogin() {
  const { isAuthed, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@smcqa.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, go to the admin dashboard
  if (isAuthed) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const result = login(email.trim(), password);

      if (result.ok) {
        navigate("/admin", { replace: true });
      } else {
        setError(result.error || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="admin-login-screen">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        
        {/* Login Icon */}
        <div className="admin-login-icon">
          <LockKeyhole size={22} />
        </div>

        {/* Heading */}
        <h1>SMC Admin</h1>

        <p>
          Sign in to manage your site content in real time.
        </p>

        {/* Error */}
        {error && (
          <div className="admin-login-error" role="alert">
            {error}
          </div>
        )}

        {/* Email */}
        <label htmlFor="admin-email">
          Email
        </label>

        <div className="admin-input-wrapper">
          <Mail size={18} />

          <input
            id="admin-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email"
            placeholder="admin@smcqa.com"
            autoComplete="username"
            required
          />
        </div>

        {/* Password */}
        <label htmlFor="admin-password">
          Password
        </label>

        <div className="admin-input-wrapper">
          <LockKeyhole size={18} />

          <input
            id="admin-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn btn-dark admin-login-button"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        {/* Demo credentials */}
        <p className="admin-login-hint">
          Demo credentials:
          <br />
          <strong>admin@smcqa.com</strong>
          {" / "}
          <strong>admin123</strong>
        </p>

        {/* Return to website */}
        <button
          type="button"
          className="admin-return-button"
          onClick={() => navigate("/")}
        >
          ← Return to website
        </button>

      </form>
    </div>
  );
}

export default AdminLogin;