import React from "react";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Progress,
  Container,
} from "@mantine/core";
import "./AddAccount.css";
import { useState } from "react";

// Password strength checker
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
interface AddAccountModalProps {
  opened: boolean;
  onClose: () => void;
  onCreate: (data: { clientId: string; password: string }) => void;
}

export default function AddAccountModal({
  opened,
  onClose,
  onCreate,
}: AddAccountModalProps) {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password validation
  const strength = getStrength(password);
  const [isFocused, setIsFocused] = useState(false);

  const handleCreate = () => {
    if (!clientId || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (password != confirmPassword) {
      alert("Password do not match");
      return;
    }

    onCreate({ clientId, password });

    setClientId("");
    setPassword("");
    setConfirmPassword("");

    onClose();
  };

  // Password requirement check indicators
  const checks = passwordRequirements.map((passwordRequirements, index) => (
    <Text
      key={index}
      size="sm"
      color={passwordRequirements.re.test(password) ? "teal" : "red"}
    >
      {passwordRequirements.label}
    </Text>
  ));
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Account"
      classNames={{ title: "AddAccountTitle" }}
      centered
    >
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Password Checker */}
        {password.length > 0 && isFocused && (
          <>
            {" "}
            <Container className="PasswordStrengthContainer">
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
          label="Confirm Password"
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />

        <div className="AddActionsGroup">
          <Button variant="outline" color="dark" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            color="blue"
            className="CreateBtn"
            onClick={handleCreate}
            fullWidth
          >
            Create Account
          </Button>
        </div>
      </div>
    </Modal>
  );
}
