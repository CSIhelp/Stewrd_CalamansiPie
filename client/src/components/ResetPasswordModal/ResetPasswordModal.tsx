import React, { useState } from "react";
import { Modal, PasswordInput, Button, Text, Container,  Progress } from "@mantine/core";
import "./ResetPasswordModal.css";

const passwordRequirements = [
  { re: /.{8,}/, label: "At least 8 characters" },
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[!@#$%^&*(),.?":{}|<>]/, label: "Includes special character" },
];
function getStrength(password: string) {
  let multiplier = password.length > 0 ? 0 : 1;

  passwordRequirements.forEach((passwordRequirements) => {
    if (!passwordRequirements.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(
    100 - (100 / (passwordRequirements.length + 1)) * multiplier,
    10
  );
}

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


  // Password validation
    const strength = getStrength(newPassword);
    const [isFocused, setIsFocused] = useState(false);

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

    // Password requirement check indicators
  const checks = passwordRequirements.map((passwordRequirements, index) => (
    <Text
      key={index}
      size="sm"
      color={passwordRequirements.re.test(newPassword) ? "teal" : "red"}
    >
      {passwordRequirements.label}
    </Text>
  ));

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
            onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

         {/* Password Checker */}
                {newPassword.length > 0 && isFocused && (
                  <>
                    {" "}
                    <Container className="NewPasswordStrengthContainer">
                      <p className="PassRequirmentsTitle"> Password Requirements </p>
                      <Progress
                        value={strength}
                        color={
                          strength > 80 ? "teal" : strength < 50 ? "red" : "yellow"
                        }
                        className="PasswordProgress "
                      />
                      <div> {checks} </div>
                    </Container>
                  </>
                )}

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
