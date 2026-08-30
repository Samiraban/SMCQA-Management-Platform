import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { API_BASE } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================================
     LOAD SAVED AUTH DATA
  ========================================= */

  useEffect(() => {
    try {
      const savedToken =
        localStorage.getItem("smcqa_token");

      const savedUser =
        localStorage.getItem("smcqa_user");

      if (savedToken) {
        setToken(savedToken);
      }

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem("smcqa_user");
        }
      }
    } catch (error) {
      console.error(
        "Failed to load authentication:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================
     LOGIN
  ========================================= */

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${API_BASE}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {
          message:
            text || "Invalid server response.",
        };
      }

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            `Login failed (${response.status})`
        );
      }

      /*
       * Support common backend response formats:
       *
       * {
       *   success: true,
       *   token: "...",
       *   user: {...}
       * }
       *
       * OR
       *
       * {
       *   success: true,
       *   data: {
       *     token: "...",
       *     user: {...}
       *   }
       * }
       */

      const authData = data.data || data;

      const newToken =
        authData.token ||
        authData.accessToken;

      const newUser =
        authData.user ||
        authData.admin ||
        null;

      if (!newToken) {
        throw new Error(
          "Login succeeded but no authentication token was returned."
        );
      }

      localStorage.setItem(
        "smcqa_token",
        newToken
      );

      if (newUser) {
        localStorage.setItem(
          "smcqa_user",
          JSON.stringify(newUser)
        );
      }

      setToken(newToken);
      setUser(newUser);

      return {
        success: true,
        token: newToken,
        user: newUser,
      };
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      throw error;
    }
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const logout = () => {
    localStorage.removeItem(
      "smcqa_token"
    );

    localStorage.removeItem(
      "smcqa_user"
    );

    setToken(null);
    setUser(null);
  };

  /* =========================================
     AUTH STATE
  ========================================= */

  const isAuthenticated = Boolean(token);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* =========================================
   USE AUTH
========================================= */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;