import React from "react";
import Background from "../LoginComponents/Background";
import Logo from "../LoginComponents/Logo";
import Header from "../LoginComponents/Header";
import Button from "../LoginComponents/Button";
import Paragraph from "../LoginComponents/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Login/SignUp</Header>
      <Paragraph>
        Please choose an option below to continue.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
