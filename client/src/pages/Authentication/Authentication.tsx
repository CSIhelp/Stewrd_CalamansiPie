import { Card, Text, Button, Container, Group, ThemeIcon, Image } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import "./Authentication.css";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className='UnauthorizedContainer'>
      <Card className='UnauthorizedCard' withBorder>
        <Group className="UnauthorizedIconGroup">
              <Image
          src=""
          height={100}
          alt="John Logo"
        />
           <Text className='UnauthorizedTitle'>
          Access Denied
        </Text>
        </Group>
      
        <Text className='UnauthorizedDesc'>
          You must be logged in to view this page.
        </Text>
        <Button
          onClick={() => navigate("/")}
          color="blue"
          className='UnauthorizedBtn'
          fullWidth
          radius="xl"
          size="md"
        >
          Log In
        </Button>
      </Card>
    </Container>
  );
};

export default Unauthorized;