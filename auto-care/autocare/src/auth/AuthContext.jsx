import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("autocare-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(name, email) {
    const newUser = {
      name,
      email,
    };

    localStorage.setItem(
      "autocare-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("autocare-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}