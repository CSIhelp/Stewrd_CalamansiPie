import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  ClientId: string;
  Role: "user" | "admin";
  Active: boolean;
  Company: string;
}

interface DisplayUser {
  clientId: string;
  role: "user" | "admin";
  isActive: boolean;
}

function useUserManagement(adminCompany: string) {
  const [users, setUsers] = useState<DisplayUser[]>(() => {
    // hydrate instantly from cache (like bookmarks)
    const cached = localStorage.getItem("Users");
    if (cached && cached !== "undefined") {
      try {
        return JSON.parse(cached);
      } catch {
        return [];
      }
    }
    return [];
  });


  const [loading, setLoading] = useState(users.length === 0);
  const token = localStorage.getItem("token");

  const fetchUsers = async (force = false) => {
    if (!token || !adminCompany) return;

    if (force || users.length === 0) {
      setLoading(true);
    }

    try {
      const res = await axios.get(
        "https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/auth/userManagement",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success && Array.isArray(res.data.users)) {
        const filtered: DisplayUser[] = res.data.users
          .filter((u: any) => u.Company === adminCompany)
          .map((u: any) => ({
            clientId: u.ClientId,
            role: u.Role,
            isActive: u.Active,
          }));

        setUsers(filtered);
        localStorage.setItem("Users", JSON.stringify(filtered));
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !adminCompany) return;

    // always fetch fresh in background
    fetchUsers(false);
  }, [adminCompany, token]);

  return { users, setUsers, loading, refreshUsers: () => fetchUsers(true) };
}

export default useUserManagement;
