import { useEffect, useState } from "react";
import axios from "axios";

function useBookmarks(token: string) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
   
    const clientId = localStorage.getItem("clientId"); 

    // 1. loading cached bookmarks instantly

 const cached = localStorage.getItem("bookmarks");
if (cached && cached !== "undefined") {
  try {
    setBookmarks(JSON.parse(cached));
  } catch (e) {
    console.error("Invalid JSON in bookmarks cache:", cached);
    localStorage.removeItem("bookmarks"); 
  }
  setLoading(false);
}

    async function fetchBookmarks() {
      try {
        const res = await axios.get(`https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks?user=${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 2. Save new data to state + localStorage
        setBookmarks(res.data.bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(res.data.bookmarks));
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    }

    // 3. Fetch new data in background
    fetchBookmarks();
  }, [token]);

  return { bookmarks, setBookmarks, loading };
}

export default useBookmarks;
