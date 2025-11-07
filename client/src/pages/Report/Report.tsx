import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";

import "./Report.css";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { NewCardsData } from "../../data/AutomationCardData";

//hooks
import useBookmarks from "../../hooks/useBookmark";

type Bookmark = {
  cardId: number;
};

function Report() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();

  const pettyCashCards = NewCardsData.filter(card => card.category === 'Report');

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);

  return (
    <>
      <Header title="Financial Report" />
      <div className="ReportContainer">
        <SideNavBar />

        <Container className="ReportCardContainer">
          <Card withBorder radius="md" p="lg" className="ReportCard">
            <Group className="ReportTitleCard">
              <h1>New</h1>
            </Group>

            {/* Petty Cash Item card 1 Reusable */}
            {pettyCashCards.map(card => (
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
export default Report;