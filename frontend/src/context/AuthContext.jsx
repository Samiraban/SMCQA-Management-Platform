import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext =
  createContext(null);

const TOKEN_KEY = "smcqa_token";
const USER_KEY = "smcqa_user";

const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  "http://localhost:5000/api"
).replace(/\/$/, "");

export function AuthProvider({
  children,
}) {
  const [token, setToken] =
    useState(() =>
      localStorage.getItem(
        TOKEN_KEY
      )
    );

  const [user, setUser] =
    useState(() => {
      try {
        const raw =
          localStorage.getItem(
            USER_KEY
          );

        return raw
          ? JSON.parse(raw)
          : null;
      } catch {
        localStorage.removeItem(
          USER_KEY
        );

        return null;
      }
    });

  const isAuthed =
    Boolean(token) &&
    user?.role === "admin";

  async function login(
    email,
    password
  ) {
    try {
      const response =
        await fetch(
          `${API_BASE}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        return {
          ok: false,
          error:
            data.message ||
            "Invalid email or password.",
        };
      }

      if (
        data.user?.role !== "admin"
      ) {
        return {
          ok: false,
          error:
            "This account does not have admin access.",
        };
      }

      localStorage.setItem(
        TOKEN_KEY,
        data.token
      );

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(
          data.user
        )
      );

      setToken(data.token);
      setUser(data.user);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      return {
        ok: false,
        error:
          "Could not connect to the backend.",
      };
    }
  }

  function logout() {
    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      USER_KEY
    );

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}