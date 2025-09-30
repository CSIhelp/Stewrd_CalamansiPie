import React, { useState, useEffect } from "react";
import {
  Modal,
  PasswordInput,
  Button,
  Text,
  Container,
  Progress,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";
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
  clientId: string;
}

export default function ResetPasswordModal({
  opened,
  onClose,
  onReset,
  clientId,
}: ResetPasswordModalProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password validation
  const strength = getStrength(newPassword);
  const [isFocused, setIsFocused] = useState(false);

    // Close Modal
    const [confirmClose, setConfirmClose] = useState(false); 
    const [isDirty, setIsDirty] = useState(false);
  

  const handleReset = async () => {
    if (!clientId || !adminPassword || !newPassword || !confirmPassword) {
      notifications.show({
        title: "All fields Required",
        message: `Reset Password for User ${clientId} failed!`,
        color: "red",
        icon: <IconX size={20} />,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      notifications.show({
        title: "Password does not match",
        message: `Reset Password for User ${clientId} failed!`,
        color: "red",
        icon: <IconX size={20} />,
      });
      return;
    }
          if (strength < 90) { 
        notifications.show({
          title: "Weak password",
          message: "Password does not meet the required strength.",
          color: "red",
          icon: <IconX size={20} />,
        });
        return;
      }
    

    try {
      const idToken = localStorage.getItem("firebaseIdToken");
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://johnbackend.vercel.app/api/auth/userManagement/${clientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
            
          },
         body: JSON.stringify({ Password: newPassword, adminPassword }),

        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        setAdminPassword("");
        setNewPassword("");
        setConfirmPassword("");
        notifications.show({
          title: " Reset Password ",
          message: `Reset Password for User ${clientId} successful!`,
          color: "teal",
          icon: <IconCheck size={20} />,
        });
        if (onReset) onReset({ adminPassword, newPassword });
        onClose();
      } else {
        notifications.show({
          title: `${result.error}`,
          message: `Reset Password for User ${clientId} failed!`,
          color: "red",
          icon: <IconX size={20} />,
        });
      }
    } catch (err) {
      alert("Network error. Could not reset password.");
      console.error(err);
    }
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



    // Clear Input 
  const resetForm = () => {
    setAdminPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

   const handleAttemptClose = () => {
    if (isDirty) {
      setConfirmClose(true);
    } else {
      onClose();
      resetForm();
    }
  };
  // Detect unsaved changes
  useEffect(() => {
    if (newPassword || confirmPassword || adminPassword) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [adminPassword, newPassword, confirmPassword]);

  return (
    <>
    <Modal
      opened={opened}
      onClose= {handleAttemptClose} 
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
          <Button variant="outline" color="dark" onClick={handleAttemptClose} fullWidth>
            Cancel
          </Button>
          <Button
            color="blue"
            className="ResetModalBtn"
            onClick={handleReset}
            fullWidth
          >
            Reset Password
          </Button>
        </div>
      </div>
    </Modal>

{/*  Unsave modal */}
 <Modal
        opened={confirmClose}
        onClose={() => setConfirmClose(false)}
        title="Unsaved Changes"
        centered
      >
        <Text>
          You have unsaved changes. Closing this window will disregard them. Do you want
          to continue?
        </Text>
        <div className="AddActionsGroup" style={{ marginTop: 20 }}>
          <Button variant="outline" color="dark" onClick={() => setConfirmClose(false)} fullWidth>
            No, go back
          </Button>
          <Button
            color="red"
            onClick={() => {
              resetForm();
              setConfirmClose(false);
              onClose();
            }}
            fullWidth
          >
            Yes, discard changes
          </Button>
        </div>
      </Modal>

</>
  );
}
