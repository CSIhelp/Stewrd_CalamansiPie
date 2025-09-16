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
  LoadingOverlay,
  Overlay,
  Transition,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import axios from "axios";
import DeactivatedAccountModal from "../../components/DeactivatedAccount/DeactivatedAccount";


import ForgotUserModal from "../../components/ForgotPassword/ForgotPasswordModal";
import { useSession } from "../../hooks/useSession";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck, IconWeight } from "@tabler/icons-react";
import { auth } from "../../firebase.js";
import { signInWithCustomToken } from "firebase/auth";

function LogIn() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotOpened, setForgotOpened] = React.useState(false);
  const [deactivatedAccount, setDeactivatedAccountOpened] =
    React.useState(false);
  // Loading for cold start
  const [loading, setLoading] = useState(false);


 const { refreshSession } = useSession();
  

 const handleLogIn = async () => {
  setError("");

  if (!clientId || !password) {
    notifications.show({
      title: "All fields are required",
      message: `Add user failed`,
      color: "red",
      icon: <IconX size={20} />,
    });
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(
      "https://johnbackend.vercel.app/api/auth/login",
      { ClientId: clientId, Password: password }
    );

    if (res.data.success) {
      const customToken = res.data.customToken;

      const userCredential = await signInWithCustomToken(auth, customToken);
      const idToken = await userCredential.user.getIdToken();

      // Save tokens in localStorage 
      localStorage.setItem("token", customToken); 
      localStorage.setItem("firebaseIdToken", idToken);
      localStorage.setItem("userRole", res.data.role);
    // optional, keep backend token too

      await refreshSession();
      navigate("/dashboard");
    } else {
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
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <header className="Header HeaderPhone">
        <div className="HeaderLogo HeaderLogoPhone">LOGO</div>
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
        <Card
          withBorder
          radius="md"
          p="lg"
          className="LogInCard"
          style={{ position: "relative" }}
        >
          <LoadingOverlay
            visible={loading}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "blue", type: "bars",   }}
           
          />

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
