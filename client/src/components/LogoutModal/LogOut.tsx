import { Modal, Button } from "@mantine/core";

interface BackLogoutModalProps {
  opened: boolean;
  onStay: () => void;
  onLogout: () => void;
}

const BackLogoutModal: React.FC<BackLogoutModalProps> = ({
  opened,
  onStay,
  onLogout,
}) => (
  <Modal opened={opened} onClose={onStay} title="You are about to log out">
    <p> You have unsaved changes. Closing this window will disregard them. Do you want
          to continue?</p>
    <Button onClick={onStay}>Stay Logged In</Button>
    <Button color="red" onClick={onLogout} style={{ marginLeft: 10 }}>
      Log Out
    </Button>
  </Modal>
);

export default BackLogoutModal;
