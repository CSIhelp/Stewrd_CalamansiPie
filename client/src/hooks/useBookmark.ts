import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const BACKEND_URL = "https://johnbackend-evuvfmcnj-csis-projects-620122e0.vercel.app";

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from cache immediately
  useEffect(() => {
    const cached = localStorage.getItem("bookmarks");
    if (cached && cached !== "undefined") {
      try {
        const parsed = JSON.parse(cached);
        setBookmarks(parsed);
        console.log("Loaded cached bookmarks:", parsed.length);
      } catch {
        localStorage.removeItem("bookmarks");
      }
    }
  }, []);

  // Function to fetch fresh data from server
  const fetchBookmarks = useCallback(async () => {
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!firebaseIdToken) return;

    try {
      console.log("Fetching bookmarks from server...");
      const res = await axios.get(`${BACKEND_URL}/api/bookmarks`, {
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });

      const fresh = res.data.bookmarks || [];
      console.log("Bookmarks received:", fresh.length);

      setBookmarks(fresh);
      localStorage.setItem("bookmarks", JSON.stringify(fresh));
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial + background sync
  useEffect(() => {
    fetchBookmarks();
    const interval = setInterval(fetchBookmarks, 300000); 
    return () => clearInterval(interval);
  }, [fetchBookmarks]);

  // Sync across browser tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "bookmarks" && e.newValue) {
        try {
          setBookmarks(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Add bookmark (optimistic)
  const addBookmark = useCallback(async (bookmark: any) => {
    setBookmarks((prev) => {
      const updated = [...prev, bookmark];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });

    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!firebaseIdToken) return;

    try {
      await axios.post(`${BACKEND_URL}/api/bookmarks`, bookmark, {
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });
      fetchBookmarks(); 
    } catch (err) {
      console.error("Error adding bookmark:", err);
      fetchBookmarks(); 
    }
  }, [fetchBookmarks]);

  // Remove bookmark (optimistic)
  const removeBookmark = useCallback(async (cardId: number) => {
    setBookmarks((prev) => {
      const updated = prev.filter((bm) => bm.cardId !== cardId);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });

    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!firebaseIdToken) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/bookmarks/${cardId}`, {
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });
    
    } catch (err) {
      console.error("Error removing bookmark:", err);
      fetchBookmarks();
    }
  }, [fetchBookmarks]);

  return { bookmarks, addBookmark, removeBookmark, loading,  fetchBookmarks };
}

export default useBookmarks;
