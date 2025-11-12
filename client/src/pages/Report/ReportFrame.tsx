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
import "./ReportFrame.css";
import Header from "../../components/Header/Header";
export default function ReportFrame() {
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
    <Header title="Financial Report Form"/>
    <Container className="ReportFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="ReportFormCard">
        <Group className="ReportFrameTop" > 
        <Text className="ReportFrameTitle">
          Finacial Report Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="ReportFrameDescription">
         Manually Generate Financial Report 
        </Text>

        <div className="ReportIframeContainer">
                        <LoadingOverlay
                          visible={isLoading}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "#009444", type: "bars" }}
                          zIndex={1}
                        /> 
                        <iframe
            className="ReportIframe"
            src="https://primary-production-a810.up.railway.app/form/bffec1c4-ff6b-4315-b29f-61041cfb9d68"
            title="Report"
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
