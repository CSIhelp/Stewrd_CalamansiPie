import React from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Documentation.css"; 


import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";
import { NewCardsData }  from "../../data/AutomationCardData";



function Documentation() {
  const documentationCards = NewCardsData.filter(card => card.category === 'Documentation');
    return (
      <>
      <Header title="Documentation"/>
      <div className="DocumentationContainer">
        <SideNavBar />
        <Container className="DocumentationCardContainer">
  
            <Card withBorder radius="md" p="lg" className="DocumentationCard">
            <Group className="DocumentationTitleCard">
                <h1>Documentation</h1>
            </Group>
       {documentationCards.map(card => (
   <ReportItemCard
          key={card.id}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          buttonLink={card.buttonLink}
        />
 ))}
            </Card>
            </Container>
        </div>
      </>
    );
  }
  export default Documentation;