import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const API_BASE =
  "https://johnbackend-b2mm634az-csis-projects-620122e0.vercel.app/api/auth";

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
  cancelBackLogout: () => {}
  
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
 
  const [user, setUser] = useState<SessionUser>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [warningId, setWarningId] = useState<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState(false);
    const [showBackWarning, setShowBackWarning] = useState(false);
  const refreshSession = async () => {
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
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
  const clearSession = async () => {
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    try {
    if (firebaseIdToken) {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
         body: JSON.stringify({ isLoggedIn: false }),
      });
    }

  } catch (err) {
    console.error("Logout API failed", err);
  } finally {
    localStorage.clear()
    setUser(null);
    setShowWarning(false);
    if (timeoutId) clearTimeout(timeoutId);
    if (warningId) clearTimeout(warningId);
     window.location.href = "/";
  }
  };
  const stayLoggedIn = () => {
  if (timeoutId) clearTimeout(timeoutId);
  if (warningId) clearTimeout(warningId);

  setShowWarning(false);
  startIdleTimer();
  };

    const cancelBackLogout = () => {
    setShowBackWarning(false);
    
      if (!window.history.state?.dummy) {
    window.history.pushState({ dummy: true }, "", window.location.href);
  }
  };


  const startIdleTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (warningId) clearTimeout(warningId);
     if (!user) return;


    // 1 hr idle duration
    const warningTime =  59 * 59 * 1000; 
    const logoutTime = 60 * 60 * 1000; 

    const warnId = setTimeout(() => {
      setShowWarning(true);
    }, warningTime);
    setWarningId(warnId);

    const outId = setTimeout(() => {
      //console.log("User logged out due to inactivity");
      clearSession();
    }, logoutTime);
    setTimeoutId(outId);
  };
  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {

      if (user) {
      startIdleTimer();

      const events = ["mousemove", "keydown", "click", "scroll"];
      const resetTimer = () => startIdleTimer();
      events.forEach((event) => window.addEventListener(event, resetTimer));

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetTimer)
        );
      };
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      if (warningId) clearTimeout(warningId);
    }
  }, [user]);

useEffect(() => {
  if (!user) return;

if (!window.history.state?.dummy) {
    window.history.pushState({ dummy: true }, "", window.location.href);
  }

  const handleBackBtn = (event: PopStateEvent) => {
    event.preventDefault();
    setShowBackWarning(true);
  };

  window.addEventListener("popstate", handleBackBtn);

  return () => {
    window.removeEventListener("popstate", handleBackBtn);
  };
}, [user]);


  return (
    <SessionContext.Provider
      value={{user,
        refreshSession,
        clearSession,
        showWarning,
        showBackWarning,
        stayLoggedIn,
        cancelBackLogout, }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
