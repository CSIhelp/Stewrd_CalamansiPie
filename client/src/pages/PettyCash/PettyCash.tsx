import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";

import "./PettyCash.css";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { NewCardsData } from "../../data/AutomationCardData";

type Bookmark = {
  cardId: number;
};

function PettyCash() {


  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  // Fetch bookmarks 
  useEffect(() => {
    const fetchBookmarks = async () => {
      const jwtToken = localStorage.getItem('token');
      const clientId = localStorage.getItem('clientId');
      const response = await fetch(`https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks?user=${clientId}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      setBookmarks(data.bookmarks || []);
    };
    fetchBookmarks();
  }, []);

  const pettyCashCards = NewCardsData.filter(card => card.category === 'PettyCash');

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);

  return (
    <>
      <Header title="Petty Cash" />
      <div className="PettyCashContainer">
        <SideNavBar />

        <Container className="PettyCashCardContainer">
          <Card withBorder radius="md" p="lg" className="PettyCashCard">
            <Group className="PettyCashTitleCard">
              <h1>New</h1>
            </Group>

            {/* Petty Cash Item card 1 Reusable */}
            {pettyCashCards.map(card => (
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
export default PettyCash;