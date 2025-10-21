import { createContext, useContext, useState, useEffect, useRef } from "react";

const API_BASE = "https://stewrd-calamasipie.vercel.app/api/auth";

type SessionUser = {
  id: string;
  company: string;
  role: string;
} | null;

interface SessionContextValue {
  user: SessionUser;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
  showWarning: boolean;
  stayLoggedIn: () => void;
  showBackWarning: boolean;
  cancelBackLogout: () => void;
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
  refreshSession: async () => {},
  clearSession: () => {},
  showWarning: false,
  stayLoggedIn: () => {},
  showBackWarning: false,
  cancelBackLogout: () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SessionUser>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showBackWarning, setShowBackWarning] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);
  const refreshingRef = useRef(false);

  // Decode JWT
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const refreshSession = async () => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;

    const token = localStorage.getItem("firebaseIdToken");
    if (!token) {
      setUser(null);
      refreshingRef.current = false;
      return;
    }

    const decoded = parseJwt(token);
    if (decoded?.exp && Date.now() / 1000 > decoded.exp) {
      console.log("Token expired, clearing session");
      clearSession();
      refreshingRef.current = false;
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/Dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        console.log("Unauthorized, clearing session");
        clearSession();
        return;
      }

      const data = await res.json();
      if (data.success && data.user) {
        const newUser = {
          id: data.user.ClientId,
          company: data.user.company,
          role: data.user.role,
        };

        // Only update if changed
        if (
          !user ||
          user.id !== newUser.id ||
          user.company !== newUser.company ||
          user.role !== newUser.role
        ) {
          console.log("Refreshing session...");
          setUser(newUser);
        }
      } else if (user !== null) {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to refresh session", err);
      setUser(null);
    } finally {
      refreshingRef.current = false;
    }
  };

  const clearSession = async () => {
     const token = localStorage.getItem("firebaseIdToken");
  const sessionId = localStorage.getItem("sessionId");

  try {
    if (token && sessionId) {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, isOnline: false }),
      });
    }
  } catch (err) {
    console.error("Logout API failed", err);
  } finally {
    localStorage.clear();
    setUser(null);
    setShowWarning(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    window.location.href = "/";
  }
};

  const startIdleTimer = () => {
    if (!user) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    warningRef.current = setTimeout(() => setShowWarning(true), 59 * 59 * 1000);
    timeoutRef.current = setTimeout(() => clearSession(), 60 * 60  * 1000);
  };

  const stayLoggedIn = () => {
    setShowWarning(false);
    startIdleTimer();
  };

  const cancelBackLogout = () => {
    setShowBackWarning(false);
    if (!window.history.state?.dummy) {
      window.history.pushState({ dummy: true }, "", window.location.href);
    }
  };

  // Initialize only once
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    refreshSession();
    refreshIntervalRef.current = setInterval(refreshSession, 15 * 60_000);

    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

  // Idle timer (runs once)
  useEffect(() => {
    if (!user) return;

    startIdleTimer();
 

    const events = ["mousemove", "keydown", "click", "scroll"];
    const resetTimer = () => startIdleTimer();
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [user]); 

  // sendBeacon logout
  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) return;
      const payload = JSON.stringify({ sessionId });
      navigator.sendBeacon(
        `${API_BASE}/logout`,
        new Blob([payload], { type: "application/json" })
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Back button warning
  useEffect(() => {
    if (!user) return;
    if (!window.history.state?.dummy)
      window.history.pushState({ dummy: true }, "", window.location.href);

    const handleBackBtn = (e: PopStateEvent) => {
      e.preventDefault();
      setShowBackWarning(true);
      console.log("handle back, user:", user);
    };
    window.addEventListener("popstate", handleBackBtn);
    return () => window.removeEventListener("popstate", handleBackBtn);
  }, [user]);

  return (
    <SessionContext.Provider
      value={{
        user,
        refreshSession,
        clearSession,
        showWarning,
        showBackWarning,
        stayLoggedIn,
        cancelBackLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
