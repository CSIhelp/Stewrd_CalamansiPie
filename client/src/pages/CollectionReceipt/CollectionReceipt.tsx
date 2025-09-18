import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";

import "./CollectionReceipt.css";

// Import components
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { NewCardsData } from "../../data/AutomationCardData";


// hooks
import useBookmarks from "../../hooks/useBookmark";

type Bookmark = {
  cardId: number;
};

function CollectionReceipt() {

  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  



  const collectionReceiptCards = NewCardsData.filter(card => card.category === 'CollectionReceipt');

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);
  return (
    <>
      <Header title="Collection Receipts" />
      <div className="CollectionReceiptContainer">
        <SideNavBar />

        <Container className="CollectionReceiptCardContainer">
          <Card withBorder radius="md" p="lg" className="CollectionReceiptCard">
            <Group className="CollectionReceiptTitleCard">
              <h1>New</h1>
            </Group>


            {collectionReceiptCards.map(card => (
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
  )
}
export default CollectionReceipt;