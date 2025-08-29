import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";

import "./CollectionReceipt.css";

// Import components
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { NewCardsData }  from "../../data/AutomationCardData";

function CollectionReceipt() {
   const collectionReceiptCards = NewCardsData.filter(card => card.category === 'CollectionReceipt');

    return(
        <>
          <Header title="Collection Receipts"/>
          <div className="CollectionReceiptContainer">
            <SideNavBar />
          
            <Container className="CollectionReceiptCardContainer">
              <Card withBorder radius="md" p="lg" className="CollectionReceiptCard">
                <Group className="CollectionReceiptTitleCard">
                  <h1>New</h1>
                </Group>

                {/* Collection Receipt Item card 1 Reusable */}
            {/* Invoice Item card 1 Reusable uses data.ts */}
 {collectionReceiptCards.map(card => (
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
export default CollectionReceipt;