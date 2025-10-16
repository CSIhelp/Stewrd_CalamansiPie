import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Deposit.css";

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

function Deposit() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

  const DepositCards = NewCardsData.filter(
    (card) => card.category === "Deposit"
  );
  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <div>
        <Header title="Deposits" />
        <div className="DepositContainer">
          <SideNavBar />
          <Container className="DepositCardContainer">
            <Card withBorder radius="md" p="lg" className="DepositCard">
              <Group className="DepositTitleCard">
                <h1>New</h1>
              </Group>

              {/* Deposit Item card 1 Reusable uses data.ts */}
              {DepositCards.map((card) => (
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
export default Deposit;
