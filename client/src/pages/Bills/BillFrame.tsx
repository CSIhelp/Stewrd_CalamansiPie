import { Card, Container, Text, Group, Button,   LoadingOverlay, } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./BillFrame.css";
import Header from "../../components/Header/Header";

export default function BillsFrame() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleBack  = () => {
    navigate ("/dashboard")
  }
 const handleUserManual = () => {
  navigate("/userManual")
 }
  return (
    <>
    <Header title="Bills Form"/>
    <Container className="BillsFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="BillsFormCard">
        <Group className="BillsFrameTop" > 
        <Text className="BillsFrameTitle">
          Bills Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="BillsFrameDescription">
         Please Upload your Bills transaction
        </Text>

        <div className="BillsIframeContainer">
              
                        <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "#009444", type: "bars" }}
                          zIndex={1}
                        />
              
          
          <iframe
            className="BillsIframe"
            src="https://primary-production-a810.up.railway.app/form/5a86a925-3ba4-4a2d-bba5-e9791b3d8b80"
            title="Bills"
          onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
                <Button className="HelpButton"  onClick={handleUserManual }>
        Need Help? Click here for user Manual
        </Button>
      </Card>
    </Container></>
  )
}
