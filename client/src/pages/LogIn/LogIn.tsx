import React, { useState } from "react";
import {
  Fieldset,
  PasswordInput,
  Card,
  Text,
  Group,
  Container,
  TextInput,
  Button,
  UnstyledButton,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import axios from "axios";
import DeactivatedAccountModal from "../../components/DeactivatedAccount/DeactivatedAccount";

import ForgotUserModal from "../../components/ForgotPassword/ForgotPasswordModal";

function LogIn() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotOpened, setForgotOpened] = React.useState(false);
  const [deactivatedAccount, setDeactivatedAccountOpened] =
    React.useState(false);
  const [token, setToken] = useState("");

  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        "https://johnbackend.vercel.app/api/auth/login",
        {
          ClientId: clientId,
          Password: password,
        }
      );

      if (res.data.success) {
        navigate("/dashboard");
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("token", res.data.token);
      } else {
        // This handles 200 responses with success: false
        if (
          res.data.error &&
          res.data.error.toLowerCase().includes("deactivated")
        ) {
          setError(
            "Your account is deactivated. Please contact your administrator."
          );
          alert(
            "Your account is deactivated. Please contact your administrator."
          );
        } else {
          setError("Invalid login");
        }
      }
    } catch (err: any) {
      // If the backend returns a non-200 code, Axios throws and response is in err.response
      if (
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error.toLowerCase().includes("deactivated")
      ) {
        setDeactivatedAccountOpened(true);
      } else {
        setError("Login failed. Please check credentials.");
      }
    }
  };

  return (
    <>
      <header className="Header">
        <div className="HeaderLogo">LOGO</div>
      </header>
      <Container className="LogInContainer">
        <Card className="LogInTitleCard">
          <Group className="LogInTitleGroup">
            <h2 className="WelcomeTxt"> Welcome to</h2>
            <h1 className="JohnTxt">JOHN</h1>
            <p className="JohnTagline">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
          </Group>
        </Card>
        <Card withBorder radius="md" p="lg" className="LogInCard">
          <h1 className="LogInTxt">Log In</h1>
          <p className="LogInDesc">Log in with Company Credentials</p>
          <Fieldset className="LogInFieldset">
            <TextInput
              label="Client ID"
              value={clientId}
              placeholder="Enter your Client Id"
              onChange={(e) => setClientId(e.currentTarget.value)}
              mt="md"
            />
            <PasswordInput
              label="Password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            {error && <Text color="red">{error}</Text>}
            <Button fullWidth className="LogInBtn" onClick={handleLogIn}>
              {" "}
              Log In{" "}
            </Button>
            <UnstyledButton
              className="ForgotPasswordBtn"
              onClick={() => setForgotOpened(true)}
            >
              {" "}
              forgot password?
            </UnstyledButton>
          </Fieldset>
          <ForgotUserModal
            opened={forgotOpened}
            onClose={() => setForgotOpened(false)}
          />

          <DeactivatedAccountModal
            opened={deactivatedAccount}
            onClose={() => setDeactivatedAccountOpened(false)}
          />
        </Card>
      </Container>
      <footer>
        <p>Copyright © Crowdsource Innovative Solutions Inc. 2025</p>
      </footer>
    </>
  );
}
export default LogIn;
