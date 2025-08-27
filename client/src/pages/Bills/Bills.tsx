import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import "./Bills.css";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";
import { useSearch } from "../../SearchContext";
function Bills() {
const { searchQuery } = useSearch();
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

                {/*Bills Item card 1 Reusable */}
                 {"Bills Upload".toLowerCase().includes(searchQuery.toLowerCase()) && (<NewItemCard 
                    title="Bills Upload"
                    description="Upload your Bills to the system for processing."
                    buttonText="View Portal"
                    buttonLink="https://example.com/collection-receipt-upload"
                />)}
              </Card>
              
          
              </Container> 
               </div>  
        </>
    )
}
export default Bills;