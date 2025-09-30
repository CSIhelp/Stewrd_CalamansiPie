import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";
import "./LooseLeaf.css";

import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";


import useBookmarks from "../../hooks/useBookmark";

function LooseLeaf() {
  const { bookmarks } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);


  const LooseLeafCards = NewCardsData.filter((card) => card.category === "LooseLeaf");

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <Header title="Looseleaf" />
      <div className="LooseLeafContainer">
        <SideNavBar />
        <Container className="LooseLeafCardContainer">
          <Card withBorder radius="md" p="lg" className="LooseLeafCard">
            <Group className="LooseLeafTitleCard">
              <h1>New</h1>
            </Group>

            {error && <Alert color="red">{error}</Alert>}

            {LooseLeafCards.map((card) => (
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

export default LooseLeaf;
