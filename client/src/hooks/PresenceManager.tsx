import { useEffect, useRef } from "react";
import axios from "axios";

const API_BASE =
  "https://johnbackend.vercel.app/api/auth";

export default function PresenceManager() {
  const pingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("firebaseIdToken");
    if (!token) return;

    const markOnline = async () => {
      try {
        await axios.post(`${API_BASE}/online`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Failed to mark online:", err);
      }
    };

    markOnline();

    pingRef.current = setInterval(async () => {
      try {
        await axios.post(`${API_BASE}/ping`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Ping sent");
      } catch (err) {
        console.error("❌ Ping failed", err);
      }
    }, 10 * 60_000);


    return () => {
      if (pingRef.current) clearInterval(pingRef.current);
    };
  }, []);

  return null; 
}
