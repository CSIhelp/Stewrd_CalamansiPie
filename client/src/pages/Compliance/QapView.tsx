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
import "./QapView.css";
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
  const handleGooglesheets = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1Wd2w8WY2cuJldvcNnz5UIow6FaU3nUGnlEwgA8kD4IM/edit?usp=sharing",
      "_blank"
    );
  }
  return (
    <>
      <Header title="Summary Quarterly Alphalist of Payees Form" />
      <Container className="QapFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="QapFormCard"
        >
          <Group className="QapFrameTop">
            <Text className="QapFrameTitle">
              Summary Quarterly Alphalist of Payees Form
            </Text>
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
          </Group>

          <Text className="QapFrameDescription">
             <strong> Important:</strong> Review the QAP thoroughly before pressing the convert button.
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
               src="https://docs.google.com/spreadsheets/d/1Wd2w8WY2cuJldvcNnz5UIow6FaU3nUGnlEwgA8kD4IM/edit?usp=sharing"
              title="Qap"
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
