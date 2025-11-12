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
import "./Qap.css";
import Header from "../../components/Header/Header";


export default function QapFrame() {
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
      <Header title="Quarterly Alphalist of Payees Form" />
      <Container className="QapFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="QapFormCard"
        >
          <Group className="QapFrameTop">
            <Text className="QapFrameTitle">
              Quarterly Alphalist of Payees Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="QapFrameDescription">
           Upload Quarterly Alphalist of Payees Report
          </Text>

          <div className="QapIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#009444", type: "bars" }}
              zIndex={1}
            />
            <iframe
              className="QapIframe"
              src="https://primary-production-a810.up.railway.app/form/82261433-4c5a-440a-9ab2-8c58c7657d0d"
              title="Qap"
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
