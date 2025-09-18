import { createContext, useContext, useState, useEffect } from "react";

const API_BASE = "https://johnbackend-hctabrmqd-csis-projects-620122e0.vercel.app/api/auth";

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
   const firebaseIdToken = localStorage.getItem("firebaseIdToken");

  const refreshSession = async () => {

  if (!firebaseIdToken) {
    setUser(null);
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/Dashboard`, {
      headers: { Authorization: `Bearer ${firebaseIdToken}` },
    });
    const data = await res.json();

    if (data.success && data.user) {
      setUser({
        id: data.user.ClientId,    
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
