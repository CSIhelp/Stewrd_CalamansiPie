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
  { re: /[!@#$%^&*(),.?\":{}|<>]/, label: "Includes special character" },
];

function getStrength(password: string) {
  let multiplier = password.length > 0 ? 0 : 1;
  passwordRequirements.forEach((req) => {
    if (!req.re.test(password)) multiplier += 1;
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
  currentUserRole: "admin" | "accountant" | string;
  currentUserId: string; 
}

export default function ResetPasswordModal({
  opened,
  onClose,
  onReset,
  clientId,
  currentUserRole,
  currentUserId,
}: ResetPasswordModalProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const strength = getStrength(newPassword);
  const isSelfAccount = currentUserId === clientId;

  useEffect(() => {
    if (opened) {
      console.log("🔹 Current User ID:", currentUserId);
      console.log("🔹 Target Client ID:", clientId);
      console.log("🔹 Current User Role:", currentUserRole);
    }
  }, [opened, currentUserId, clientId, currentUserRole]);

  // Accountant can only reset their own password
  const isDisabled =
    currentUserRole === "accountant" && !isSelfAccount ? true : false;

  const handleReset = async () => {
    if (isDisabled) return;

    if (!clientId || !adminPassword || !newPassword || !confirmPassword) {
      notifications.show({
        title: "All fields required",
        message: `Reset Password for User ${clientId} failed!`,
        color: "red",
        icon: <IconX size={20} />,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      notifications.show({
        title: "Passwords do not match",
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
      const response = await fetch(
        `https://stewrd-calamasipie.vercel.app/api/auth/userManagement/${clientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
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
          title: "Reset Successful",
          message: `Password for User ${clientId} updated successfully!`,
          color: "teal",
          icon: <IconCheck size={20} />,
        });
        onReset({ adminPassword, newPassword });
        onClose();
      } else {
        notifications.show({
          title: `${result.error}`,
          message: `Reset Password for User ${clientId} failed!`,
          color: "red",
          icon: <IconX size={20} />,
        });
      }
    } catch {
      alert("Network error. Could not reset password.");
    }
  };

  const checks = passwordRequirements.map((req, i) => (
    <Text key={i} size="sm" color={req.re.test(newPassword) ? "teal" : "red"}>
      {req.label}
    </Text>
  ));

  const resetForm = () => {
    setAdminPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAttemptClose = () => {
    if (isDirty) setConfirmClose(true);
    else {
      onClose();
      resetForm();
    }
  };

  useEffect(() => {
    if (newPassword || confirmPassword || adminPassword) setIsDirty(true);
    else setIsDirty(false);
  }, [adminPassword, newPassword, confirmPassword]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleAttemptClose}
        title="Reset User Password"
        centered
        classNames={{ title: "ResetModalTitle" }}
      >
        <div className="ResetPasswordContainer">
          <Container className="ResetPasswordDescription">
            <Text size="sm" className="ResetDescription">
              Enter a new password for the user below.
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

            {newPassword.length > 0 && isFocused && (
              <Container className="NewPasswordStrengthContainer">
                <p className="PassRequirmentsTitle">Password Requirements</p>
                <Progress
                  value={strength}
                  color={
                    strength > 80 ? "teal" : strength < 50 ? "red" : "yellow"
                  }
                  className="PasswordProgress"
                />
                <div>{checks}</div>
              </Container>
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
              label={
                currentUserRole === "accountant"
                  ? "Current Password"
                  : "Admin Password"
              }
              placeholder={
                currentUserRole === "accountant"
                  ? "Enter your current password"
                  : "Enter admin password"
              }
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.currentTarget.value)}
              mt="md"
            />
            <Text size="sm" className="ResetDescription">
              {currentUserRole === "accountant"
                ? "Enter your current password to confirm and change it."
                : "Enter the admin password to confirm and reset user password."}
            </Text>
          </Container>

          <div className="ResetActionsGroup">
            <Button
              variant="outline"
              color="dark"
              onClick={handleAttemptClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              color="#009444"
              className="ResetModalBtn"
              onClick={handleReset}
              fullWidth
              disabled={isDisabled}
            >
              {isDisabled
                ? "Not allowed"
                : currentUserRole === "accountant"
                ? "Change Password"
                : "Reset Password"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Unsaved changes modal */}
      <Modal
        opened={confirmClose}
        onClose={() => setConfirmClose(false)}
        title="Unsaved Changes"
        centered
      >
        <Text>
          You have unsaved changes. Closing this window will discard them. Do
          you want to continue?
        </Text>
        <div className="AddActionsGroup" style={{ marginTop: 20 }}>
          <Button
            variant="outline"
            color="dark"
            onClick={() => setConfirmClose(false)}
            fullWidth
          >
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
