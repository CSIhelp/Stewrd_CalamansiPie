import { createContext, useContext, useState, useEffect } from "react";

const API_BASE = "https://johnbackend-ppm2l7jvf-csis-projects-620122e0.vercel.app/api/auth";

type SessionUser = {
  id: string;
  company: string;
  role: string;
} | null;

interface SessionContextValue {
  user: SessionUser;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
  refreshSession: async () => {},
  clearSession: () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SessionUser>(null);

  const refreshSession = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/Dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser({
          id: data.user.id,
          company: data.user.company,
          role: data.user.role,
        });
      }
    } catch (err) {
      console.error("Failed to refresh session", err);
    }
  };

  // log out 
  const clearSession = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, refreshSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
