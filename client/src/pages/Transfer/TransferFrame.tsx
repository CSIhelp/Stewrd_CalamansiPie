import { Card, Container, Text, Group, Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import "./TransferFrame.css";
import Header from "../../components/Header/Header";

export default function TransferFrame() {
    const navigate = useNavigate(); 
  const handleBack  = () => {
    navigate ("/dashboard")
  }
 const handleUserManual = () => {
  navigate("/userManual")
 }
  return (
    <>
    <Header title="Fund Transfer Form"/>
    <Container className="TransferFrameContainer">
     
      <Card shadow="sm" radius="md" withBorder className="TransferFormCard">
        <Group className="TransferFrameTop" > 
        <Text className="TransferFrameTitle">
          Fund Transfer Form
        </Text>
        <Button className="BackButton" onClick={handleBack }>
          Back To Dashboard
        </Button>
        </Group>
      
        <Text className="TransferFrameDescription">
         Please Record your Fund Transfer transactions
        </Text>

        <div className="TransferIframeContainer">
          <iframe
            className="TransferIframe"
            src="https://example.com/frame"
            title="Transfer"
           
          ></iframe>
        </div>
                <Button className="HelpButton"  onClick={handleUserManual }>
        Need Help? Click here for user Manual
        </Button>
      </Card>
    </Container></>
  )
}
