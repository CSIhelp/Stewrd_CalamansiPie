import React, { useEffect, useState } from "react"; import { Card, Group, Container } from "@mantine/core";
import "./Payments.css";

// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";

//hooks
import useBookmarks from "../../hooks/useBookmark";

type Bookmark = {
  cardId: number;
};



function Payments() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);


  const paymentsCards = NewCardsData.filter(card => card.category === 'Payments');

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);
  return (
    <>
      <Header title="Payments" />
      <div className="PaymentsContainer">
        <SideNavBar />
        <Container className="PaymentsCardContainer">
          <Card withBorder radius="md" p="lg" className="PaymentsCard">
            <Group className="PaymentsTitleCard">
              <h1>New</h1>
            </Group>
            {/* Payments Item card 1 Reusable */}
            {paymentsCards.map(card => (
              <NewItemCard
                key={card.id}
                cardId={card.id}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
                category={card.category}
              />
            ))}


          </Card>


        </Container>
      </div>
    </>
  );
}
export default Payments;