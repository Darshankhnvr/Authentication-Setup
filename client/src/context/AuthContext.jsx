import { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

/*
  Auth Provider
  Holds logged-in user and auth actions
*/
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Save user after login
  function login(userData) {
    setUser(userData);
  }

  // Clear user on logout
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
