import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import "./Bills.css";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";

function Bills() {

    return(
        <>
          <Header title="Bills"/>
          <div className="BillsContainer">
            <SideNavBar />
            </div>  
            <Container className="BillsCardContainer">
              <Card withBorder radius="md" p="lg" className="BillsCard">
                <Group className="BillsTitleCard">
                  <h1>New</h1>
                </Group>

                {/*Bills Item card 1 Reusable */}
                <NewItemCard 
                    title="Bills Upload"
                    description="Upload your Billss to the system for processing."
                    buttonText="View Portal"
                    buttonLink="https://example.com/collection-receipt-upload"
                />
              </Card>
              
              <Card withBorder radius="md" p="lg" className="BillsCard">
                <Group className="BillsTitleCard">
                  <h1>Reports</h1>
                </Group>

                {/* Bills Item card 2 Reusable */}
                <ReportItemCard 
                    title="Bills Google Sheets"
                    description="Access pre-configured templates for data entry and reporting."
                    buttonText="View Report"
                    buttonLink="https://example.com/collection-receipt-report"    
                />
              </Card>
              </Container>
        </>
    )
}
export default Bills;