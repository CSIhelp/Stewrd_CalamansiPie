import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import "./CollectionReceipt.css";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";

function CollectionReceipt() {

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
                <NewItemCard 
                    title="Collection Receipt Upload"
                    description="Upload your collection receipts to the system for processing."
                    buttonText="View Portal"
                    buttonLink="https://example.com/collection-receipt-upload"
                />
              </Card>
              
              
              </Container> 
               </div>  
        </>
    )
}
export default CollectionReceipt;