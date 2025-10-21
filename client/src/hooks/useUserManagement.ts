import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface DisplayUser {
  clientId: string;
  role: "user" | "admin" | "accountant";
  isActive: boolean;
  isOnline: boolean;
}

function useUserManagement(adminCompany: string) {
  const [users, setUsers] = useState<DisplayUser[]>(() => {
    const cached = localStorage.getItem("Users");
    if (cached && cached !== "undefined") {
      try {
        return JSON.parse(cached);
      } catch {
        localStorage.removeItem("Users");
        return [];
      }
    }
    return [];
  });

  const [loading, setLoading] = useState(users.length === 0);
  const token = localStorage.getItem("firebaseIdToken");

  const fetchUsers = useCallback(
    async (force = false) => {
      if (!token || !adminCompany) return;

      if (!force && users.length > 0) return; 
      setLoading(true);

      try {
        const res = await axios.get(
          "https://stewrd-calamasipie.vercel.app/api/auth/userManagement",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { company: adminCompany },
          }
        );

        if (res.data.success && Array.isArray(res.data.users)) {
          const filtered: DisplayUser[] = res.data.users
            .filter((u: any) => u.Company === adminCompany)
            .map((u: any) => ({
              clientId: u.ClientId,
              role: u.Role,
              isActive: u.Active,
              isOnline: u.isOnline,
            }));

          setUsers(filtered);
          localStorage.setItem("Users", JSON.stringify(filtered));
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, adminCompany, users.length]
  );

  // fetch once on mount or when company changes
  useEffect(() => {
    fetchUsers(false);
  }, [adminCompany, fetchUsers]);

  // sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "Users" && e.newValue) {
        try {
          setUsers(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { users, setUsers, loading, refreshUsers: () => fetchUsers(true) };
}

export default useUserManagement;
