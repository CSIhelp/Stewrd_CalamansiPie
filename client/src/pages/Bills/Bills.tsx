import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";
import "./Bills.css";

// Import components
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData }  from "../../data/AutomationCardData";
import { useSearch } from "../../SearchContext";

function Bills() {

   const billsCards = NewCardsData.filter(card => card.category === 'Bills');
    return(
        <>
          <Header title="Bills"/>
          <div className="BillsContainer">
            <SideNavBar />
          
            <Container className="BillsCardContainer">
              <Card withBorder radius="md" p="lg" className="BillsCard">
                <Group className="BillsTitleCard">
                  <h1>New</h1>
                </Group>

               {billsCards.map(card => (
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
    )
}
export default Bills;