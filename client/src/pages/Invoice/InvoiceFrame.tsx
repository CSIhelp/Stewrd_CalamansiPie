import React, { useState } from "react";
import {
  Card,
  Container,
  Text,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import "./InvoiceFrame.css";
import Header from "../../components/Header/Header";

export default function InvoiceFrame() {
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
    <Header title="Invoice Form"/>
    <Container className="InvoiceFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="InvoiceFormCard">
        <Group className="InvoiceFrameTop" > 
        <Text className="InvoiceFrameTitle">
          Invoice Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="InvoiceFrameDescription">
         Please Upload your Invoice transaction
        </Text>

        <div className="InvoiceIframeContainer">
                        <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "#8F87F1", type: "bars" }}
                          zIndex={1}
                        />
          <iframe
            className="InvoiceIframe"
            src="https://example.com/Invoice-frame"
            title="Invoice"
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
