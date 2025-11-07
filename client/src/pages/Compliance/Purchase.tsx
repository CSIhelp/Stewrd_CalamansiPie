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
import "./Slsp.css";
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
  return (
    <>
      <Header title="List of Purchases Form" />
      <Container className="SlspFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="SlspFormCard"
        >
          <Group className="SlspFrameTop">
            <Text className="SlspFrameTitle">
              List of Purchases Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="SlspFrameDescription">
            Upload List of Purchases Report
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
              src="https://primary-production-a810.up.railway.app/form/a993a91a-ab35-4567-b89d-89d16852d271"
              title="Slsp"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
          <Button className="HelpButton" onClick={handleUserManual}>
            Need Help? Click here for user Manual
          </Button>
        </Card>
      </Container>
    </>
  );
}
