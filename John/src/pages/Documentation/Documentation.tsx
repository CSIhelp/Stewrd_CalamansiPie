import React from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Documentation.css"; 


import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";



function Documentation() {
        const DocumentationTitle = [
      "Invoice Documentation","Petty Cash Documentation"
        , "Collection Receipt Documentation"
         , "Bills Documentation"
          , "Payments Documentation"


    ]
    return (
      <>
      <Header title="Documentation"/>
      <div className="DocumentationContainer">
        <SideNavBar />
        <Container className="DocumentationCardContainer">
  
            <Card withBorder radius="md" p="lg" className="DocumentationCard">
            <Group className="DocumentationTitleCard">
                <h1>Reports</h1>
            </Group>
           {DocumentationTitle.map((title, index) => (   
           <ReportItemCard 
            key={index }
            title={title}
            description="Access pre-configured templates for data entry and reporting."
            buttonText="View Documentation"
            buttonLink="https://example.com/payments-report"/>

            ))}
            </Card>
            </Container>
        </div>
      </>
    );
  }
  export default Documentation;