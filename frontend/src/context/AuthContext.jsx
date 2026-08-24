import { createContext, useContext, useState } from "react";

/**
 * Frontend-only admin session. Good enough to gate the /admin routes today.
 * When your friend's backend is ready, replace `login()` with a real call to
 * POST /api/auth/login, store the returned JWT instead of the boolean below,
 * and send it as an Authorization header from api.js.
 */
const AuthContext = createContext(null);

const DEMO_USER = { email: "admin@smcqa.com", password: "admin123" };
const SESSION_KEY = "smcqa_admin_session";

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  function login(email, password) {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthed(true);
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password." };
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
