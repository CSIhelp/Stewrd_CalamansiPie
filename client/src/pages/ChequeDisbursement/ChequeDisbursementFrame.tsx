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
import "./ChequeDisbursementFrame.css";
import Header from "../../components/Header/Header";

export default function ChequeDisbursementFrame() {
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
      <Header title="Cheque Disbursement Form" />
      <Container className="ChequeDisbursementFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="ChequeDisbursementFormCard"
        >
          <Group className="ChequeDisbursementFrameTop">
            <Text className="ChequeDisbursementFrameTitle">
              Cheque Disbursement Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="ChequeDisbursementFrameDescription">
            Please Upload your Cheque Disbursement transaction
          </Text>

          <div className="ChequeDisbursementIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#009444", type: "bars" }}
              zIndex={1}
            />
            <iframe
              className="ChequeDisbursementIframe"
              src="https://primary-production-a810.up.railway.app/form/e0e2d57d-95b3-4724-bff1-dc33fed13f44"
              title="ChequeDisbursement"
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
