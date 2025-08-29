import React from 'react';
import { Modal, Text, Button, Group } from '@mantine/core';
import './ForgotPasswordModal.css'

interface ForgotModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function ForgotUserModal({ opened, onClose }: ForgotModalProps) {
  const handleDelete = async () => {
   
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="FORGOT PASSWORD? " classNames={{title:'ForgotModalTitle'}} centered>
      <div className='ModalDivider'></div>
      <Text>Please contact your administrator to reset your password.</Text>
      <Group justify="flex-end" mt="md">
        <Button color="blue" onClick={handleDelete}>Done</Button>
      </Group>
    </Modal>
  );
}
