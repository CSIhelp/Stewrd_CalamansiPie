import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Withdraw.css";

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

function Withdraw() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

  const WithdrawCards = NewCardsData.filter(
    (card) => card.category === "Withdrawal"
  );
  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <div>
        <Header title="Withdraws" />
        <div className="WithdrawContainer">
          <SideNavBar />
          <Container className="WithdrawCardContainer">
            <Card withBorder radius="md" p="lg" className="WithdrawCard">
              <Group className="WithdrawTitleCard">
                <h1>New</h1>
              </Group>

              {/* Withdraw Item card 1 Reusable uses data.ts */}
              {WithdrawCards.map((card) => (
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
export default Withdraw;
