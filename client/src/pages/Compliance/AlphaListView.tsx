import React, { useState, useRef, useEffect  } from "react";
import {
  Card,
  Container,
  Text,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./AlphaListView.css";
import Header from "../../components/Header/Header";


export default function AapFrame() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard");
  };
  const handleUserManual = () => {
    navigate("/userManual");
  };
  const handleGooglesheets = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1SNS3ZrmI6m6YPMR7plWij3L48iohui8e2meuJaFT_wc/edit?usp=sharing",
      "_blank"
    );
  }
const handleFullscreenToggle = () => {
    const container = iframeRef.current?.parentElement;
    if (!container) return;

    const anyDoc = document as any;
    const anyContainer = container as any;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (anyContainer.webkitRequestFullscreen) {
        anyContainer.webkitRequestFullscreen();
      }

      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (anyDoc.webkitExitFullscreen) {
        anyDoc.webkitExitFullscreen();
      }

      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
    };
  }, []);

  return (
    <>
      <Header title="Review AAP and QAP Form" />
      <Container className="AapFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="AapFormCard"
        >
          <Group className="AapFrameTop">
            
            <Text className="AapFrameTitle">
           
           Review AAP and QAP Form
            </Text>
            <Group>
             <Button onClick={handleFullscreenToggle} className="BackButton">
                            {isFullscreen ? "Exit Full Screen" : "Full Screen"}
                          </Button>
            
            <Button className="BackButton" onClick={handleBack}>
              Back To Dashboard
            </Button>
            </Group>
          </Group>

          <Text className="AapFrameDescription">
            
               <strong> Important:</strong> Review the AAP and QAP thoroughly before pressing the convert button.
          </Text>

          <div className="AapIframeContainer">
            <LoadingOverlay
              visible={isLoading}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "#29aae1", type: "bars" }}
              zIndex={1}
            />
            {isFullscreen && (
              <button
                className="ExitFullscreenFloatingBtn"
                onClick={handleFullscreenToggle}
              >
                Exit Full Screen ✕
              </button>
            )}

            <iframe
              ref={iframeRef}
              className="AapIframe"
              src="https://docs.google.com/spreadsheets/d/1SNS3ZrmI6m6YPMR7plWij3L48iohui8e2meuJaFT_wc/edit?usp=sharing"
              title="PurchaseOrder"
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
