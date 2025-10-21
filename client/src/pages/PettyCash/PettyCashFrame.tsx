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
import "./PettyCashFrame.css";
import Header from "../../components/Header/Header";

export default function PettyCashFrame() {
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
    <Header title="Petty Cash Form"/>
    <Container className="PettyCashFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="PettyCashFormCard">
        <Group className="PettyCashFrameTop" > 
        <Text className="PettyCashFrameTitle">
          Petty Cash Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="PettyCashFrameDescription">
         Please Upload your Petty Cash transaction
        </Text>

        <div className="PettyCashIframeContainer">
                        <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "#009444", type: "bars" }}
                          zIndex={1}
                        /> 
                        <iframe
            className="PettyCashIframe"
            src="https://example.com/PettyCash-frame"
            title="PettyCash"
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
