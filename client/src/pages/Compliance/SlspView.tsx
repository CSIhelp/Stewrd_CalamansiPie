import React, { useState } from "react";
import {
  Card,
  Container,
  Text,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./SlspView.css";
import Header from "../../components/Header/Header";


export default function SlspFrame() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard");
  };
  const handleUserManual = () => {
    navigate("/userManual");
  };
  const handleGooglesheets = () => {
    window.open(
      "https://primary-production-a810.up.railway.app/form/1d7c3233-6161-4cd8-aa10-260cd94fdca2",
      "_blank"
    );
  }
  return (
    <>
      <Header title="Summary Alphalist of Withholding Tax at Source Form" />
      <Container className="SlspFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="SlspFormCard"
        >
          <Group className="SlspFrameTop">
            <Text className="SlspFrameTitle">
            Review List of Sales and Purchases Form (SLSP)
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="SlspFrameDescription">
          <strong> Important:</strong> Review the SLSP thoroughly before pressing the convert button.
                    
          </Text>

          <div className="SlspIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#009444", type: "bars" }}
              zIndex={1}
            />
            <iframe
              className="SlspIframe"
               src="https://primary-production-a810.up.railway.app/form/1d7c3233-6161-4cd8-aa10-260cd94fdca2"
              title="Slsp"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
         <Button className="SheetButton" onClick={handleGooglesheets}>
            Go to google spreadsheets
          </Button>
          <Button className="HelpButton" onClick={handleUserManual}>
            Need Help? Click here for user Manual
          </Button>
        </Card>
      </Container>
    </>
  );
}
