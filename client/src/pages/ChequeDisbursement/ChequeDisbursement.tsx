import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";
import "./ChequeDisbursement.css";

import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";


import useBookmarks from "../../hooks/useBookmark";

function ChequeDisbursement() {
  const { bookmarks } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);


  const ChequeDisbursementCards = NewCardsData.filter((card) => card.category === "ChequeDisbursement");

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <Header title="Cheque Disbursement" />
      <div className="ChequeDisbursementContainer">
        <SideNavBar />
        <Container className="ChequeDisbursementCardContainer">
          <Card withBorder radius="md" p="lg" className="ChequeDisbursementCard">
            <Group className="ChequeDisbursementTitleCard">
              <h1>New</h1>
            </Group>

            {error && <Alert color="red">{error}</Alert>}

            {ChequeDisbursementCards.map((card) => (
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

export default ChequeDisbursement;
