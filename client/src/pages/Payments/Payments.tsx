import React from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Payments.css";

// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData }  from "../../data/AutomationCardData";



function Payments() {
  const paymentsCards = NewCardsData.filter(card => card.category === 'Payments');
    return (
      <>
      <Header title="Payments"/>
      <div className="PaymentsContainer">
        <SideNavBar />
        <Container className="PaymentsCardContainer">
        <Card withBorder radius="md" p="lg" className="PaymentsCard">
        <Group className="PaymentsTitleCard">
            <h1>New</h1>
            </Group>
            {/* Payments Item card 1 Reusable */}
  {paymentsCards.map(card => (  
       <NewItemCard
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
export default Payments;