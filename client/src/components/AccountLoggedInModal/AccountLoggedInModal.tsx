import React, { useState } from "react";
import { Modal, PasswordInput, Button, Group, Text } from "@mantine/core";

type AlreadyLoggedInModalProps = {
  opened: boolean;
  onClose: () => void;
  clientId: string;
  onConfirm: (password: string) => void;
};

export default function AlreadyLoggedInModal({
  opened,
  onClose,
  clientId,
  onConfirm,
}: AlreadyLoggedInModalProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!password) return;
    onConfirm(password);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Already Logged In"  className= "AlreadyLoggedin" centered>
      <Text mb="sm">
        Your account <b>{clientId}</b> is active on another device.  
        Would you like to log out there and continue here?
      </Text>
      <PasswordInput
        label="Confirm Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Enter your password"
        required
        mb="md"
      />
      <Group justify="flex-end">
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </Group>
    </Modal>
  );
}
