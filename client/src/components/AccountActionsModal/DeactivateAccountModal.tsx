import React from "react";
import { Modal, Text, Button, Group } from "@mantine/core";
import "./DeactivateAccountModal.css";
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface DeactivateAccountModalProps {
  opened: boolean;
  onClose: () => void;
  clientId: string;
  onDeactivated?: () => void;
}

export default function DeactivateAccountModal({
  opened,
  onClose,
  clientId,
  onDeactivated,
}: DeactivateAccountModalProps) {
  const handleDeactivate = async () => {
    if (!clientId) {
      alert("No user selected!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://johnbackend-ppm2l7jvf-csis-projects-620122e0.vercel.app/api/auth/userManagement/deactivate/${clientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        console.log("User deactivated:", result);
        if (onDeactivated) onDeactivated();
        notifications.show({
          title: "Account Deactivated",
          message: `Successfully Deactivated`,
          color: "yellow",
          icon: <IconCheck size={20} />,
        });
        onClose();
      } else {
        notifications.show({
          title: result.message,
          message: result.error,
          color: "red",
          icon: <IconX size={20} />,
        });
      }
    } catch (err) {
      alert("Network error. Could not deactivate user.");
      console.error(err);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="DEACTIVATE USER"
      classNames={{ title: "DeactivateModalTitle" }}
      centered
    >
      <Text>
        Are you sure you want to deactivate this account? The user will not be
        able to log in until reactivated.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color="yellow" onClick={handleDeactivate}>
          Deactivate
        </Button>
      </Group>
    </Modal>
  );
}
