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
import "./TinFrame.css";
import Header from "../../components/Header/Header";

export default function TinFrame() {
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
    <Header title=" Vendor TIN Registration Form"/>
    <Container className="TinFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="TinFormCard">
        <Group className="TinFrameTop" > 
        <Text className="TinFrameTitle">
        Vendor  Tin Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="TinFrameDescription">
         Register Vendor or Supplier TIN here
        </Text>

        <div className="TinIframeContainer">
                        <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "blue", type: "bars" }}
                          zIndex={100}
                        />
          <iframe
            className="TinIframe"
            src="https://primary-production-a810.up.railway.app/form/98db236f-d78a-4410-949b-9b2cf3db8e8e"
            title="Tin"
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
