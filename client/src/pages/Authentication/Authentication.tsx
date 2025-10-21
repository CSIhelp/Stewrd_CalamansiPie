import { Button, Container, Group, Text, Title } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import "./Authentication.css";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="UnauthorizedContainer">
      <Container>
        <div className="UnauthorizedLabel">401</div>
        <Title className="UnauthorizedTitle">Restricted Area</Title>
        <Text size="lg" ta="center" className="UnauthorizedDescription">
          Oops! It looks like you don’t have access to this page. Please log in
          to continue.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md"  onClick={() => navigate("/")}>
            Log In Account
          </Button>
        </Group>
      </Container>
    </div>
  );
}
export default Unauthorized;