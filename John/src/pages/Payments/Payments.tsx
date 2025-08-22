import React from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Payments.css";

// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";



function Payments() {
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
            <NewItemCard 
            title="Payments Upload"
            description="Upload your payments to the system for processing."
            buttonText="View Portal"
            buttonLink="https://example.com/payments-upload"/>

          
            </Card>

            <Card withBorder radius="md" p="lg" className="PaymentsCard">
            <Group className="PaymentsTitleCard">
                <h1>Documetation</h1>
            </Group>
            <ReportItemCard 
            title="Payments Google Sheets"
            description="Access pre-configured templates for data entry and reporting."
            buttonText="View Report"
            buttonLink="https://example.com/payments-report"/>

            </Card>
            </Container>
        </div>
      </>
    );
}
export default Payments;