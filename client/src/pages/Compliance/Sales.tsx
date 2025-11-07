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
      <Header title="List of Sales Form" />
      <Container className="SlspFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="SlspFormCard"
        >
          <Group className="SlspFrameTop">
            <Text className="SlspFrameTitle">
              List of Sales Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="SlspFrameDescription">
            Upload List of Sales Report
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
              src="https://primary-production-a810.up.railway.app/form/0114c687-4fe8-4fa1-a7c0-00634627bedf"
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
