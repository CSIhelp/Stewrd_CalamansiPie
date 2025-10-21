import React, { useState, useEffect } from "react";
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
import AlreadyLoggedInModal from "../../components/AccountLoggedInModal/AccountLoggedInModal";
import ForgotUserModal from "../../components/ForgotPassword/ForgotPasswordModal";
import { useSession } from "../../hooks/useSession";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck, IconWeight } from "@tabler/icons-react";

import { auth } from "../../firebase.js";
import { signInWithCustomToken } from "firebase/auth";
// image
import CalamansiPielogo from "/Joe.png";

function LogIn() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotOpened, setForgotOpened] = React.useState(false);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [pendingCreds, setPendingCreds] = useState<{
    clientId: string;
    password: string;
  } | null>(null);
  const [deactivatedAccount, setDeactivatedAccountOpened] =
    React.useState(false);

  useEffect(() => {
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (firebaseIdToken) {
      fetch("https://john-CalamansiPie.vercel.app/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      }).catch((err) => console.error("Logout API failed", err));
    }

    localStorage.removeItem("token");
    localStorage.removeItem("firebaseIdToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("firstLogin");
    auth.signOut();
  }, []);

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
        "https://stewrd-calamasipie.vercel.app/api/auth/login",
        { ClientId: clientId, Password: password }
      );

      if (res.data.success) {
        const customToken = res.data.customToken;
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();
        const userConmpany = res.data.company;
        const sessionId = res.data.sessionId;
        const allowedCompany = "CalamansiPie";

        if (userConmpany !== allowedCompany) {
          notifications.show({
            title: "Unauthorized Company",
            message: "Only CalamansiPie employees can log in",
            color: "red",
            icon: <IconX size={20} />,
          });
          setLoading(false);
          return;
        }

        // Save tokens in localStorage
        localStorage.setItem("token", customToken);
        localStorage.setItem("firebaseIdToken", idToken);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("sessionId", sessionId);

        await refreshSession();

        if (res.data.firstLogin && res.data.role == "admin") {
          refreshSession();
          navigate("/dashboard");
          localStorage.setItem("firstLogin", "true");
        } else {
          refreshSession();
          navigate("/dashboard");
        }

        if (
          res.data.error &&
          res.data.error.toLowerCase().includes("deactivated")
        ) {
          setError(
            "Your account is deactivated. Please contact your administrator."
          );
          notifications.show({
            title: "Deactivated",
            message: "Please Contact your administrator ",
            color: "red",
            icon: <IconX size={20} />,
          });
        } 
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        const errorMsg = err.response.data.error.toLowerCase();

        if (errorMsg.includes("deactivated")) {
          setDeactivatedAccountOpened(true);
        } else if (errorMsg.includes("already logged in")) {
          setPendingCreds({ clientId, password });
          setAlreadyLoggedIn(true);
          notifications.show({
            title: "Already Logged In",
            message:
              "Your account is active on another device. Please log out there first.",
            color: "red",
            icon: <IconX size={20} />,
          });
        } else {
          notifications.show({
            title: "Log In Failed",
            message: "Please enter correct Client ID and Password",
            color: "red",
            icon: <IconX size={20} />,
          });
        }
      } else {
        notifications.show({
          title: "Log In Failed",
          message: "Something went wrong. Please try again.",
          color: "red",
          icon: <IconX size={20} />,
        });
      }
    } finally {
      setClientId("");
      setPassword("");
      setLoading(false);
    }
  };

  const handleForceLogin = async (passwordFromModal: string) => {
    if (!pendingCreds) return;
    try {
      setLoading(true);
      const res = await axios.post(
        "https://john-CalamansiPie.vercel.app/api/auth/login",
        {
          ClientId: pendingCreds.clientId,
          Password: passwordFromModal,
          forceLogout: true,
        }
      );

         const userConmpany = res.data.company;
        const allowedCompany = "CalamansiPie";

        if (userConmpany !== allowedCompany) {
          notifications.show({
            title: "Unauthorized Company",
            message: "Only CalamansiPie employees can log in",
            color: "red",
            icon: <IconX size={20} />,
          });
          setLoading(false);
          return;
        }

      if (res.data.success) {
        const customToken = res.data.customToken;
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();

        localStorage.setItem("token", customToken);
        localStorage.setItem("firebaseIdToken", idToken);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("sessionId", res.data.sessionId);

        await refreshSession();
        navigate("/dashboard");
        setAlreadyLoggedIn(false);
        setPendingCreds(null);
      }
    } catch (err) {
      notifications.show({
        title: "Log In Failed",
        message: "Unable to force logout. Please try again.",
        color: "red",
        icon: <IconX size={20} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="Header HeaderPhone">
        <div className="HeaderLogo HeaderLogoPhone">
          {" "}
          <img src={CalamansiPielogo} alt="Logo" className="LogoImage" />
        </div>
      </header>
      <Container className="LogInContainer">
        <Card className="LogInTitleCard">
          <Group className="LogInTitleGroup">
            <h2 className="WelcomeTxt"> Welcome to</h2>
            <h1 className="JohnTxt">JOHN</h1>
            <p className="JohnTagline">
              {" "}
              Spend less time managing, more time growing.{" "}
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
            loaderProps={{ color: "violet", type: "bars" }}
            zIndex={1}
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
          <AlreadyLoggedInModal
            clientId={pendingCreds?.clientId || ""}
            opened={alreadyLoggedIn}
            onClose={() => setAlreadyLoggedIn(false)}
            onConfirm={handleForceLogin}
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
