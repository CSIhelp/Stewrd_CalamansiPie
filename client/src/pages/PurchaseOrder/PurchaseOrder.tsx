import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";

// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";
import "./PurchaseOrder.css"
//hooks
import useBookmarks from "../../hooks/useBookmark";

type Bookmark = {
  cardId: number;
};

function PurchaseOrder() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

  const PurchaseOrderCards = NewCardsData.filter(
    (card) => card.category === "PurchaseOrder"
  );
  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <div>
        <Header title="Purchase Orders" />
        <div className="PurchaseOrderContainer">
          <SideNavBar />
          <Container className="PurchaseOrderCardContainer">
            <Card withBorder radius="md" p="lg" className="PurchaseOrderCard">
              <Group className="PurchaseOrderTitleCard">
                <h1>New</h1>
              </Group>

              {/* PurchaseOrder Item card 1 Reusable uses data.ts */}
              {PurchaseOrderCards.map((card) => (
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
export default PurchaseOrder;
