import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RequireAuth({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  // Auth state is read from localStorage on mount, which happens
  // a tick after the first render. Without this check, refreshing
  // any /admin/* page would briefly see isAuthenticated=false and
  // bounce a logged-in admin back to the login screen.
  if (loading) {
    return null;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RequireAuth;