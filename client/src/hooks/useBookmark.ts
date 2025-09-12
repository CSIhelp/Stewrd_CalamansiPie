import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function useBookmarks(token: string) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("bookmarks");
    if (cached && cached !== "undefined") {
      try {
        const parsed = JSON.parse(cached);
        setBookmarks(parsed);
        console.log("Loaded cached bookmarks:", parsed.length);
      } catch (e) {
        console.error("Invalid JSON in bookmarks cache:", cached);
        localStorage.removeItem("bookmarks");
      }
    }
  }, []);


  useEffect(() => {
    if (!token) {
      console.log("No token provided to useBookmarks");
      setLoading(false);
      return;
    }

    async function fetchBookmarks() {
      try {
        console.log("Fetching bookmarks from server...");
        const res = await axios.get(
          `https://johnbackend-ppm2l7jvf-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fresh = res.data.bookmarks || [];
        console.log("Bookmarks received:", fresh.length);

        setBookmarks(fresh);
        localStorage.setItem("bookmarks", JSON.stringify(fresh));
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, [token]);

  
  const addBookmark = useCallback((bookmark: any) => {
    setBookmarks((prev) => {
      const updated = [...prev, bookmark];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((cardId: number) => {
    setBookmarks((prev) => {
      const updated = prev.filter((bm) => bm.cardId !== cardId);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { bookmarks, setBookmarks, addBookmark, removeBookmark, loading };
}

export default useBookmarks;
