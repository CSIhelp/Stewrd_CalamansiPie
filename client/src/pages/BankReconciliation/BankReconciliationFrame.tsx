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
import "./BankReconciliationFrame.css";
import Header from "../../components/Header/Header";

export default function BankReconciliationFrame() {
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
      <Header title="Bank Reconciliation Form" />
      <Container className="BankReconciliationFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="BankReconciliationFormCard"
        >
          <Group className="BankReconciliationFrameTop">
            <Text className="BankReconciliationFrameTitle">
              Bank Reconciliation Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="BankReconciliationFrameDescription">
            Please Upload SOA for Bank Reconciliation
          </Text>

          <div className="BankReconciliationIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#009444", type: "bars" }}
              zIndex={1}
            />
            <iframe
              className="BankReconciliationIframe"
              src="https://example.com/frame"
              title="BankReconciliation"
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
