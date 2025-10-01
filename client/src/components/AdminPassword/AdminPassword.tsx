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
import { useNavigate } from "react-router-dom";

const passwordRequirements = [
  { re: /.{8,}/, label: "At least 8 characters" },
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[!@#$%^&*(),.?":{}|<>]/, label: "Includes special character" },
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

interface FirstLoginModalProps {
  opened: boolean;
  onClose: () => void;
  clientId: string;
  firebaseIdToken: string;
}

export default function FirstLoginModal({
  opened,
  onClose,
  clientId,
  firebaseIdToken,
}: FirstLoginModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const navigate = useNavigate();

  const strength = getStrength(newPassword);

  useEffect(() => {
    if (oldPassword || newPassword || confirmPassword) setIsDirty(true);
    else setIsDirty(false);
  }, [oldPassword, newPassword, confirmPassword]);

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };


  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      notifications.show({
        title: "All fields are required",
        message: "",
        color: "red",
        icon: <IconX size={20} />,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notifications.show({
        title: "password does not match",
        message: "",
        color: "red",
        icon: <IconX size={20} />,
      });
      return;
    }

    if (strength < 90) {
      notifications.show({
        title: "Weak password",
        message: "Password does not meet requirements",
        color: "red",
        icon: <IconX size={20} />,
      });
      return;
    }

    try {
      const res = await fetch(
        `https://johncis.vercel.app/api/auth/firstLogin/${clientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseIdToken}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        notifications.show({
          title: "Password Updated",
          message: "Your password has been updated successfully",
          color: "teal",
          icon: <IconCheck size={20} />,
        });
        resetForm();
        onClose();
      } else {
        notifications.show({
          title: result.error || "Error",
          message: "Could not update password",
          color: "red",
          icon: <IconX size={20} />,
        });
      }
    } catch (err) {
      // console.error(err);
      notifications.show({
        title: "Network error",
        message: "Could not update password",
        color: "red",
        icon: <IconX size={20} />,
      });
    }
  };

  const checks = passwordRequirements.map((req, index) => (
    <Text
      key={index}
      size="sm"
      color={req.re.test(newPassword) ? "teal" : "red"}
    >
      {req.label}
    </Text>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {}}
        title="Change Default Password"
         withCloseButton={false}  
        centered 
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Container>
          <Text> For security reasons, you must update your password on first log in  before accessing the dashboard.</Text>
          <PasswordInput
            label="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.currentTarget.value)}
            mt="md"
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            mt="md"
          />
          {newPassword && isFocused && (
            <div style={{ marginTop: 10 }}>{checks}</div>
          )}
          <PasswordInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            mt="md"
          />
          <Button color="blue" fullWidth mt="md" onClick={handleChangePassword}>
            Update Password
          </Button>
        </Container>
      </Modal>
    </>
  );
}
