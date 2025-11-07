import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";
import "./Compliance.css";

import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";


import useBookmarks from "../../hooks/useBookmark";

function Compliance() {
  const { bookmarks } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

const userRole = localStorage.getItem("userRole");
  const ComplianceCards = NewCardsData.filter(
    (card) => card.category === "Compliance" 
  );
  const ComplianceCards1 = NewCardsData.filter(
    (card) => card.category === "ComplianceReport"
  );


  const filteredCards = ComplianceCards.filter((card) => {
    if (card.role) {
      
      return Array.isArray(card.role)
        ? card.role.includes(userRole)
        : card.role === userRole;
    }
    return true; 
  });
  const filteredCards1 = ComplianceCards1.filter((card) => {
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
      <Header title="Tax Compliance" />
      <div className="ComplianceContainer">
        <SideNavBar />
        <Container className="ComplianceCardContainer">
          <Card withBorder radius="md" p="lg" className="ComplianceCard">
            <Group className="ComplianceTitleCard">
              <h1>New</h1>
            </Group>
<Card withBorder radius="md" p="lg" className="ComplianceCardList">
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
          </Card> 
                    <Card withBorder radius="md" p="lg" className="ComplianceCard">
            <Group className="ComplianceTitleCard">
              <h1>Review</h1>
            </Group>
<Card withBorder radius="md" p="lg" className="ComplianceCardList1">
            {error && <Alert color="red">{error}</Alert>}

              {filteredCards1.map((card) => (
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
          </Card> 
        </Container>
        
      </div>
    </>
  );
}

export default Compliance;
