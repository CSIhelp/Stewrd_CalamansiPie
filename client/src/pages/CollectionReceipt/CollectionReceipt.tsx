import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";

import "./CollectionReceipt.css";

// Import components
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { NewCardsData } from "../../data/AutomationCardData";

type Bookmark = {
  cardId: number;
};

function CollectionReceipt() {
const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  const BACKEND_URL = "https://johnbackend-ppm2l7jvf-csis-projects-620122e0.vercel.app";

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const jwtToken = localStorage.getItem('token');
        
        if (!jwtToken) {
          console.log(" No token found in localStorage");
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        console.log("Fetching bookmarks for PettyCash page...");
        
        const response = await fetch(`${BACKEND_URL}/api/bookmarks/bookmarks`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Bookmarks fetched:", data.bookmarks?.length || 0);
        
        setBookmarks(data.bookmarks || []);
        setError(null);
      } catch (err) {
        console.error(" Error fetching bookmarks:", err);
        setError("Failed to load bookmarks");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const collectionReceiptCards = NewCardsData.filter(card => card.category === 'CollectionReceipt');

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);
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


            {collectionReceiptCards.map(card => (
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
  )
}
export default CollectionReceipt;