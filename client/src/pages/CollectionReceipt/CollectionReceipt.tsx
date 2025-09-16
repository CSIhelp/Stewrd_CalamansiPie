import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container, Loader } from "@mantine/core";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { NewCardsData } from "../../data/AutomationCardData";

type Bookmark = {
  cardId: number;
  id: string; // Firestore doc ID
};

function CollectionReceipt() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const BACKEND_URL =
    "https://johnbackend-odmuotqj7-csis-projects-620122e0.vercel.app";

  const jwtToken = localStorage.getItem("token");

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    if (!jwtToken) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/bookmarks`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setBookmarks(data.bookmarks || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      setError("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const isBookmarked = (cardId: number) =>
    bookmarks.some((bm) => bm.cardId === cardId);


  const collectionReceiptCards = NewCardsData.filter(
    (card) => card.category === "CollectionReceipt"
  );

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Loader />
      </div>
    );

  return (
    <>
      <Header title="Collection Receipts" />
      <div className="CollectionReceiptContainer">
        <SideNavBar />
        <Container className="CollectionReceiptCardContainer">
          <Card withBorder radius="md" p="lg" className="CollectionReceiptCard">
            <Group className="CollectionReceiptTitleCard">
              <h1>New</h1>
            </Group>

            {collectionReceiptCards.map((card) => (
              <NewItemCard
                key={card.id}
                cardId={card.id}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
                category={card.category}
                isBookmarked={isBookmarked(card.id)}
             
              />
            ))}
          </Card>
        </Container>
      </div>
    </>
  );
}

export default CollectionReceipt;
