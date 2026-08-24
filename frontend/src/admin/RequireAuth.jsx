import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/smc-console/login" replace />;
  return children;
}

export default RequireAuth;