import { Card, Container, Text, Group, Button , LoadingOverlay} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./LooseLeafFrame.css";
import Header from "../../components/Header/Header";

export default function LooseLeafFrame() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleBack = () => {
    navigate("/dashboard");
  };
  const handleUserManual = () => {
    navigate("/userManual");
  };
  return (
    <>
      <Header title="LooseLeaf Form" />
      <Container className="LooseLeafFrameContainer">
        <Card shadow="sm" radius="md" withBorder className="LooseLeafFormCard">
          <Group className="LooseLeafFrameTop">
            <Text className="LooseLeafFrameTitle">LooseLeaf Form</Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="LooseLeafFrameDescription">
            Please Upload your LooseLeaf transaction
          </Text>

          <div className="LooseLeafIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#8F87F1", type: "bars" }}
              zIndex={1}
            />
            <iframe
              className="LooseLeafIframe"
              src="https://example.com/frame"
              title="LooseLeaf"
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
