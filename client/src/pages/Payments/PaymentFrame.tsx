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

import "./PaymentFrame.css";
import Header from "../../components/Header/Header";

export default function PaymentFrame() {
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
      <Header title="Payment Form" />
      <Container className="PaymentFrameContainer">
        <Card shadow="sm" radius="md" withBorder className="PaymentFormCard">
          <Group className="PaymentFrameTop">
            <Text className="PaymentFrameTitle">Bills Payment Form</Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="PaymentFrameDescription">
            Please Upload your payment transaction
          </Text>

          <div className="PaymentIframeContainer">
            {isLoading && (
              <LoadingOverlay
                visible={isLoading}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "#009444", type: "bars" }}
                zIndex={1}
              />
            )}

            <iframe
              className="PaymentIframe"
              src="https://primary-production-a810.up.railway.app/webhook/calamansi-pie-unpaid-vendors"
              title="Payment"
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
