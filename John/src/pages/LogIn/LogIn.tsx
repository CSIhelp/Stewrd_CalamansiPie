import React from "react";
import { Fieldset, PasswordInput, Card, Group, Container, TextInput, Button, UnstyledButton } from '@mantine/core';
import "./LogIn.css";

function LogIn() {
    return (
        <>
        <header className="Header">    
              <div className="HeaderLogo">LOGO</div>

        </header>
        <Container className="LogInContainer">
            <Card className="LogInTitleCard">
                <h1 className="WelcomeTxt"> Welcome to</h1>
                <h1 className="JohnTxt">JOHN</h1>
                <p className="JohnTagline"> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </Card>
            <Card withBorder radius="md" p="lg" className="LogInCard">
          
                    <h1 className="LogInTxt">Log In</h1>
                    <p className="LogInDesc">Log in with Company Credentials</p>
                <Fieldset  className="LogInFieldset">
                     <TextInput label="Client ID" placeholder="Enter your Client Id" mt="md" />
                    <PasswordInput label="Password" placeholder="Enter your password" required />
                    <Button fullWidth className="LogInBtn"> Log In </Button>
                    <UnstyledButton className="ForgotPasswordBtn"> forgot password?</UnstyledButton>
                </Fieldset>
            </Card>
     
        </Container>
       <footer>
                <p>Copyright © Crowdsource Innovative Solutions Inc. 2025</p>
            </footer>
  </>
    );
}
export default LogIn;