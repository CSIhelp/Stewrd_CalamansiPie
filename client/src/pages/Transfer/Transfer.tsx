import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Transfer.css";

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

function Transfer() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

  const TransferCards = NewCardsData.filter(
    (card) => card.category === "Transfer"
  );
  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <div>
        <Header title="Transfers" />
        <div className="TransferContainer">
          <SideNavBar />
          <Container className="TransferCardContainer">
            <Card withBorder radius="md" p="lg" className="TransferCard">
              <Group className="TransferTitleCard">
                <h1>New</h1>
              </Group>

              {/* Transfer Item card 1 Reusable uses data.ts */}
              {TransferCards.map((card) => (
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
      </div>
    </>
  );
}
export default Transfer;
