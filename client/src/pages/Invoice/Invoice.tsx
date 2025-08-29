import React from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Invoice.css";


// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData }  from "../../data/AutomationCardData";


function Invoice () {
 const invoiceCards = NewCardsData.filter(card => card.category === 'Invoice');
    return(
        <> 
<div>
<Header title="Invoices"/>
<div className="InvoiceContainer">
<SideNavBar />
<Container className="InvoiceCardContainer">
<Card withBorder radius="md" p="lg" className="InvoiceCard">
<Group className="InvoiceTitleCard">
<h1>New</h1>
</Group>

{/* Invoice Item card 1 Reusable uses data.ts */}
 {invoiceCards.map(card => (
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
</div>
  
    </>
    )
}
export default Invoice;
