import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";
import "./Bills.css";

import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";


import useBookmarks from "../../hooks/useBookmark";

function Bills() {
  const { bookmarks } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);


  const billsCards = NewCardsData.filter((card) => card.category === "Bills");

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <Header title="Bills" />
      <div className="BillsContainer">
        <SideNavBar />
        <Container className="BillsCardContainer">
          <Card withBorder radius="md" p="lg" className="BillsCard">
            <Group className="BillsTitleCard">
              <h1>New</h1>
            </Group>

            {error && <Alert color="red">{error}</Alert>}

            {billsCards.map((card) => (
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

export default Bills;
