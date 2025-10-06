import React from "react";
import { Modal, Text, Button, Group } from "@mantine/core";
import "./DeleteAccountModal.css";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";

interface DeleteUserModalProps {
  opened: boolean;
  onClose: () => void;
  clientId: string;
  onDeleted?: () => void;
}

export default function DeleteUserModal({
  opened,
  onClose,
  clientId,
  onDeleted,
}: DeleteUserModalProps) {
  const handleDelete = async () => {
    try {
    
      const token = localStorage.getItem("firebaseIdToken");
      const response = await fetch(
        `https://johncis.vercel.app/api/auth/userManagement/${clientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          }
        }
      );

      const result = await response.json();
      if (response.ok) {
        //console.log("User deleted:", result);
        if (onDeleted) onDeleted();
        notifications.show({
          title: "Account Deleted",
          message: `Account Permanently Deleted`,
          color: "red",
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
      alert("Network error. Could not delete user.");
      console.error(err);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="DELETE USER"
      classNames={{ title: "DeleteModalTitle" }}
      centered
    >
      <Text>
        Are you sure you want to delete your account? This action cannot be
        undone.{" "}
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
