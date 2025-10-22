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
import "./CollectionReceiptFrame.css";
import Header from "../../components/Header/Header";

export default function CollectionReceiptFrame() {
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
    <Header title="Collection Receipt Form"/>
    <Container className="CollectionReceiptFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="CollectionReceiptFormCard">
        <Group className="CollectionReceiptFrameTop" > 
        <Text className="CollectionReceiptFrameTitle">
          Collection Receipt Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="CollectionReceiptFrameDescription">
         Please Upload your Collection Receipt
        </Text>

        <div className="CollectionReceiptIframeContainer">
                        <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "#009444", type: "bars" }}
                          zIndex={1}
                        />
          <iframe
            className="CollectionReceiptIframe"
            src="https://primary-production-a810.up.railway.app/webhook/calamansi-pie-unpaid-customers"
            title="CollectionReceipt"
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
