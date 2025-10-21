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
import "./WithdrawFrame.css";
import Header from "../../components/Header/Header";

export default function WithdrawFrame() {
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
    <Header title="Withdraw Form"/>
    <Container className="WithdrawFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="WithdrawFormCard">
        <Group className="WithdrawFrameTop" > 
        <Text className="WithdrawFrameTitle">
          Withdraw Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="WithdrawFrameDescription">
         Please Upload your Withdraw transaction
        </Text>

        <div className="WithdrawIframeContainer">
           <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "#009444", type: "bars" }}
                          zIndex={1}
                        />
          <iframe
            className="WithdrawIframe"
            src="https://example.com/frame"
            title="Withdraw"
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
