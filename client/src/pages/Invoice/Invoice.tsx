import React from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Invoice.css";

// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";


function Invoice () {

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

{/* Invoice Item card 1 Reusable */}
<NewItemCard 
    title="Invoices Upload"
    description="Upload your invoices to the system for processing."
    buttonText="View Portal"
    buttonLink="https://example.com/invoices-upload"
    />
 
</Card>

   </Container>
</div>
</div>
  
    </>
    )
}
export default Invoice;
