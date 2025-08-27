import React from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import "./PettyCash.css";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import ReportItemCard from "../../components/ReportItemCard/ReportItemCard";
function PettyCash() {

    return(
        <>
          <Header title="Petty Cash"/>
          <div className="PettyCashContainer">
            <SideNavBar />
           
            <Container className="PettyCashCardContainer">
              <Card withBorder radius="md" p="lg" className="PettyCashCard">
                <Group className="PettyCashTitleCard">
                  <h1>New</h1>
                </Group>

                {/* Petty Cash Item card 1 Reusable */}
                <NewItemCard 
                    title="Petty Cash Upload"
                    description="Upload your petty cash transactions to the system for processing."
                    buttonText="View Portal"
                    buttonLink="https://example.com/petty-cash-upload"
                />
              </Card>
              
          
              </Container>
              </div>  
        </>
    )
}
export default PettyCash;