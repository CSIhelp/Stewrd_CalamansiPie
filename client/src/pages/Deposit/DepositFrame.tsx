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
import "./DepositFrame.css";
import Header from "../../components/Header/Header";

export default function DepositFrame() {
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
    <Header title="Deposit Form"/>
    <Container className="DepositFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="DepositFormCard">
        <Group className="DepositFrameTop" > 
        <Text className="DepositFrameTitle">
          Deposit Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="DepositFrameDescription">
         Please Upload your Deposit transaction
        </Text>

        <div className="DepositIframeContainer">
              <LoadingOverlay
                visible={isLoading}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "#009444", type: "bars" }}
                zIndex={1}
              />          
          <iframe
            className="DepositIframe"
            src="https://primary-production-a810.up.railway.app/form/c45fbc2a-d85d-4727-881b-881a3f634bf9"
            title="Deposit"
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
