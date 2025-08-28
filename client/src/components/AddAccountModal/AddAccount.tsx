import React from "react";
import { Modal, TextInput, PasswordInput, Button, Text } from '@mantine/core';
import './AddAccount.css'
import {useState } from 'react';



interface AddAccountModalProps {
  opened: boolean;
  onClose: () => void;
  onCreate: (data: { clientId: string; password: string }) => void;
}

export default function AddAccountModal ({ opened, onClose, onCreate }: AddAccountModalProps) {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreate = () => {
    if (!clientId || !password || !confirmPassword)
    {
        alert ('All fields are required')
        return;
    }
    if (password != confirmPassword) {
        alert('Password do not match')
        return;
    }
    
    onCreate ({clientId, password})

    setClientId ('')
    setPassword('')
    setConfirmPassword('')
    
    onClose();
};

return (
    <Modal opened={opened} onClose={onClose} title="Add Account" centered>
      <div className="AddAccountContainer">
        <Text size="sm" className="AddDescription">
          Fill out all fields to create new user account
        </Text>

        <TextInput
          label="Client ID"
          placeholder="Enter Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.currentTarget.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />

        <div className="AddAction">
          <Button color="blue" onClick={handleCreate} fullWidth>
            Create Account
          </Button>
          <Button variant="outline" color="dark" onClick={onClose} fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );  

  }
