import { useSession } from "../../hooks/useSession";
import { Modal, Button, Group } from "@mantine/core";
import "./IdleModal.css";

const IdleModal = () => {
    const { user, showWarning, stayLoggedIn, clearSession } = useSession();

    return (
     <Modal opened={!!user && showWarning} onClose={stayLoggedIn} title="Are you still there?">
        <p>You will be logged out in 1 minute due to inactivity.</p>
        <Group className="IdleActionGroup"> 
        <Button  className = " StayBtn " onClick={stayLoggedIn}>Stay Logged In</Button>
        <Button  className = " OutBtn "  color="red" onClick={clearSession} style={{ marginLeft: 10 }}>
          Log Out 
        </Button>
        </Group>
      </Modal>
    )
}

export default IdleModal; 