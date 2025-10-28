import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";
import "./BankReconciliation.css";

import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";


import useBookmarks from "../../hooks/useBookmark";

function BankReconciliation() {
  const { bookmarks } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

const userRole = localStorage.getItem("userRole");
  const BankReconciliationCards = NewCardsData.filter(
    (card) => card.category === "BankReconciliation" || card.category === "BankReconciliationReport"
  );


  const filteredCards = BankReconciliationCards.filter((card) => {
    if (card.role) {
      
      return Array.isArray(card.role)
        ? card.role.includes(userRole)
        : card.role === userRole;
    }
    return true; 
  });

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <Header title="Bank Reconciliation" />
      <div className="BankReconciliationContainer">
        <SideNavBar />
        <Container className="BankReconciliationCardContainer">
          <Card withBorder radius="md" p="lg" className="BankReconciliationCard">
            <Group className="BankReconciliationTitleCard">
              <h1>New</h1>
            </Group>

            {error && <Alert color="red">{error}</Alert>}

              {filteredCards.map((card) => (
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

export default BankReconciliation;
