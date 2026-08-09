import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: null, loading: true, refresh: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
