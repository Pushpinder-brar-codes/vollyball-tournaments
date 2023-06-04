import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { Text } from "react-native-paper";
import Background from "../LoginComponents/Background";
import Logo from "../LoginComponents/Logo";
import Header from "../LoginComponents/Header";
import Button from "../LoginComponents/Button";
import TextInput from "../LoginComponents/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import userAtom from "../State/Store";
import { useAtom } from "jotai";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../firebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [user, setUser] = useAtom(userAtom);
  const [error, setError] = useState(null);

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      // setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    console.log(email.value,"   ",password.value)

    
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          setError(null)
          // Signed in
          const user = userCredential.user;
          setUser(user);
          // console.log(user);
          // createUserDocumentInFirebase(user)
          navigation.navigate("AddTournament");
        })
        .catch((error) => {
          console.log("error hai ji firebase create user vich, ", error);
          setError("Error, Email is already in use")
        });
  
  };

  const createUserDocumentInFirebase = async (user) =>{
    try {
      const docRef = await setDoc(doc(db, "users", user.uid), {
        user: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      ToastAndroid.showWithGravity(
        "Submitted Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Create Account</Header>
      
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {error?<Text style={{color:"red"}}>
        {error}
      </Text>:""}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
