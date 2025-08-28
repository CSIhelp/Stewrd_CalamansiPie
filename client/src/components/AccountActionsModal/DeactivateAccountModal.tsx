import React from 'react';
import { Modal, Text, Button, Group } from '@mantine/core';

interface DeactivateUserModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function DeactivateUserModal({ opened, onClose }: DeactivateUserModalProps) {
  const handleDeactivate = async () => {
    // API call to deactivate user
    console.log('Deactivating user...');
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="DEACTIVATE USER" classNames={{title:'DeactivateModalTitle'}} centered>
      <Text>Are you sure you want to deactivate this account? The user will not be able to log in until reactivated </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button color="yellow" onClick={handleDeactivate}>Deactivate</Button>
      </Group>
    </Modal>
  );
}
