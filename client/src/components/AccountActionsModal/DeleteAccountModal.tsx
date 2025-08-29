import React from 'react';
import { Modal, Text, Button, Group } from '@mantine/core';
import './DeleteAccountModal.css'

interface DeleteUserModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function DeleteUserModal({ opened, onClose }: DeleteUserModalProps) {
  const handleDelete = async () => {
    // API call to Delete user
    console.log('Deleting user...');
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="DELETE USER" classNames={{title:'DeleteModalTitle'}} centered>
      <Text>Are you sure you want to delete your account? This action cannot be undone. </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button color="red" onClick={handleDelete}>Delete</Button>
      </Group>
    </Modal>
  );
}
