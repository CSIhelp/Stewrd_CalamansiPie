import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Container,
  Text,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./PurchaseOrderFrame.css";
import Header from "../../components/Header/Header";

export default function PurchaseOrderFrame() {
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
      <Header title="Purchase Order Form" />
      <Container className="PurchaseOrderFrameContainer">
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="PurchaseOrderFormCard"
        >
          <Group className="PurchaseOrderFrameTop">
            <Text className="PurchaseOrderFrameTitle">Purchase Order Form</Text>

            <Group>
              {/* FULLSCREEN BUTTON */}
              <Button onClick={handleFullscreenToggle} className="BackButton">
                {isFullscreen ? "Exit Full Screen" : "Full Screen"}
              </Button>

              <Button className="BackButton" onClick={handleBack}>
                Back To Dashboard
              </Button>
            </Group>
          </Group>

          <Text className="PurchaseOrderFrameDescription">
            Please Record your Purchase Order transactions
          </Text>

          <LoadingOverlay
            visible={isLoading}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "#29aae1", type: "bars" }}
            zIndex={100}
          />

          <div className="PurchaseOrderIframeContainer">
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
              className="PurchaseOrderIframe"
              src="https://primary-production-a810.up.railway.app/webhook/6c7af1c1-65e7-46a9-a55e-29daebc31b05"
              title="PurchaseOrder"
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
