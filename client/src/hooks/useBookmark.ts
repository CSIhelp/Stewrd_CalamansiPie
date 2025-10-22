import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const BACKEND_URL = "https://stewrd-calamasipie.vercel.app";

// A global singleton interval and cache
let globalInterval: NodeJS.Timeout | null = null;
let globalBookmarks: any[] = [];
let subscribers: ((bm: any[]) => void)[] = [];

function notifySubscribers() {
  subscribers.forEach((fn) => fn(globalBookmarks));
}

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<any[]>(globalBookmarks);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!firebaseIdToken) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/bookmarks`, {
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });
      globalBookmarks = res.data.bookmarks || [];
      notifySubscribers();
      localStorage.setItem("bookmarks", JSON.stringify(globalBookmarks));
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscribe this component
  useEffect(() => {
    const handler = (bm: any[]) => setBookmarks(bm);
    subscribers.push(handler);

    // Load cached bookmarks immediately
    const cached = localStorage.getItem("bookmarks");
    if (cached) {
      try {
        globalBookmarks = JSON.parse(cached);
        notifySubscribers();
      } catch {}
    }

    // Start global interval if not started
    if (!globalInterval) {
      fetchBookmarks(); // fetch immediately
      globalInterval = setInterval(fetchBookmarks, 300000); // every 5 mins
    }

    return () => {
      subscribers = subscribers.filter((fn) => fn !== handler);
      if (subscribers.length === 0 && globalInterval) {
        clearInterval(globalInterval);
        globalInterval = null;
      }
    };
  }, [fetchBookmarks]);

  const addBookmark = useCallback(async (bookmark: any) => {
    globalBookmarks.push(bookmark);
    notifySubscribers();
    localStorage.setItem("bookmarks", JSON.stringify(globalBookmarks));

    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!firebaseIdToken) return;

    try {
      await axios.post(`${BACKEND_URL}/api/bookmarks`, bookmark, {
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });
    } catch (err) {
      console.error("Error adding bookmark:", err);
      fetchBookmarks(); // fallback refresh
    }
  }, [fetchBookmarks]);

  const removeBookmark = useCallback(async (cardId: number) => {
    globalBookmarks = globalBookmarks.filter((bm) => bm.cardId !== cardId);
    notifySubscribers();
    localStorage.setItem("bookmarks", JSON.stringify(globalBookmarks));

    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!firebaseIdToken) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/bookmarks/${cardId}`, {
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });
    } catch (err) {
      console.error("Error removing bookmark:", err);
      fetchBookmarks(); // fallback refresh
    }
  }, [fetchBookmarks]);

  return { bookmarks, addBookmark, removeBookmark, loading, fetchBookmarks };
}

export default useBookmarks;
