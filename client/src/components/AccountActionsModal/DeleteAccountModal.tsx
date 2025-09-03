import React from 'react';
import { Modal, Text, Button, Group } from '@mantine/core';
import './DeleteAccountModal.css'

interface DeleteUserModalProps {
  opened: boolean;
  onClose: () => void;
  clientId: string;
  onDeleted?: () => void; 
}

export default function DeleteUserModal({ opened, onClose, clientId, onDeleted }: DeleteUserModalProps) {
const handleDelete = async () => {
    try {
      const response = await fetch(`https://johnbackend-cgzq7qjv2-csis-projects-620122e0.vercel.app/api/auth//userManagement/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log('User deleted:', result);
        if (onDeleted) onDeleted();
        onClose();
      } else {
        alert(result.message || 'Failed to delete user');
      }
    } catch (err) {
      alert('Network error. Could not delete user.');
      console.error(err);
    }
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
