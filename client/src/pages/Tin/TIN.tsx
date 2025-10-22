import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Tin.css";

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

function Tin() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

  const invoiceCards = NewCardsData.filter(
    (card) => card.category === "Tin"
  );
  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <div>
        <Header title="TIN Registration" />
        <div className="TinContainer">
          <SideNavBar />
          <Container className="TinCardContainer">
            <Card withBorder radius="md" p="lg" className="TinCard">
              <Group className="TinTitleCard">
                <h1>New</h1>
              </Group>

              {/* Tin Item card 1 Reusable uses data.ts */}
              {invoiceCards.map((card) => (
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
export default Tin;
