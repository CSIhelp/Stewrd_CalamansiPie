import React, { useState } from "react";
import { Modal, PasswordInput, Button, Text, Container } from "@mantine/core";
import "./ResetPasswordModal.css";

interface ResetPasswordModalProps {
  opened: boolean;
  onClose: () => void;
  onReset: (data: { adminPassword: string; newPassword: string }) => void;
}

export default function ResetPasswordModal({
  opened,
  onClose,
  onReset,
}: ResetPasswordModalProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (!adminPassword || !newPassword || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    //  Backend Validation 
    // Later: Replace with API call to validate admin password and reset user password
    // Example:
    // const response = await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ adminPassword, newPassword }) });

    onReset({ adminPassword, newPassword });

    
    setAdminPassword("");
    setNewPassword("");
    setConfirmPassword("");

    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Reset User Password"
      centered
      classNames={{ title: "ResetModalTitle" }}
    >
      <div className="ResetPasswordContainer">
   <Container className="ResetPasswordDescription">
   <Text size="sm" className="ResetDescription">
          Enter New password for the user below.
        </Text>
        <PasswordInput
          label="New Password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
          mt="md"
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Re-enter New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          mt="md"
        />
</Container>

   <Container className="ResetConfirmContainer">

        <PasswordInput
          label="Admin Password"
          placeholder="Enter Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.currentTarget.value)}
          mt="md"
        />
          <Text size="sm" className="ResetDescription">
          Enter the admin password to confirm and reset user password.
        </Text>
</Container>
        <div className="ResetActionsGroup">  
          
            <Button
            variant="outline"
            color="dark"
            onClick={onClose}
            fullWidth
            
          >
            Cancel
          </Button>
          <Button color="blue" className="ResetModalBtn" onClick={handleReset} fullWidth>
            Reset Password
          </Button>
      
        </div>
      </div>
    </Modal>
  );
}
