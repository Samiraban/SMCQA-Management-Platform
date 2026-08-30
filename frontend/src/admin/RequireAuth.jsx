import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RequireAuth({
  children,
}) {
  const {
    isAuthed,
    user,
  } = useAuth();

  if (
    !isAuthed ||
    user?.role !== "admin"
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;