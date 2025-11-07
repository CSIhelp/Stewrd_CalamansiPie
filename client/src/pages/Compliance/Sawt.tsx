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
import "./Sawt.css";
import Header from "../../components/Header/Header";


export default function SawtFrame() {
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
      <Header title="Summary Alphalist of Withholding Tax at Source Form" />
      <Container className="SawtFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="SawtFormCard"
        >
          <Group className="SawtFrameTop">
            <Text className="SawtFrameTitle">
              Summary Alphalist of Withholding Tax at Source Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="SawtFrameDescription">
            Upload Summary Alphalist of Withholding Tax at Source Report
          </Text>

          <div className="SawtIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#009444", type: "bars" }}
              zIndex={1}
            />
            <iframe
              className="SawtIframe"
              src="https://primary-production-a810.up.railway.app/form/2148a9a5-9548-4dc1-862e-2e64230aad5c"
              title="Sawt"
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
