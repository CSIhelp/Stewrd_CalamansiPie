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
import "./AlphaList.css";
import Header from "../../components/Header/Header";


export default function AlphaListFrame() {
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
      <Header title="Annual Alphalist of Payees Form" />
      <Container className="AlphaListFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="AlphaListFormCard"
        >
          <Group className="AlphaListFrameTop">
            <Text className="AlphaListFrameTitle">
              Annual Alphalist of Payees Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="AlphaListFrameDescription">
            Please Upload Report for Annual Alphalist of Payees
          </Text>

          <div className="AlphaListIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
             loaderProps={{ color: "#009444", type: "bars" }}

              zIndex={1}
            />
            <iframe
              className="AlphaListIframe"
              src="https://primary-production-a810.up.railway.app/form/6ebb9a37-96d1-4aaa-887c-045699a630ba"
              title="AlphaList"
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
