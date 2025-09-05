import React from 'react';
import { Modal, Text, Button, Group } from '@mantine/core';

interface DeactivatedAccountModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function DeactivatedAccountModal({ opened, onClose }: DeactivatedAccountModalProps) {


  return (
    <Modal opened={opened} onClose={onClose} title="DEACTIVATED USER" classNames={{title:'DeactivateModalTitle'}} centered>
      <Text>Your account is deactivated. Please contact your administrator.</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>OK</Button>
      </Group>
    </Modal>
  );
}