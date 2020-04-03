import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import R from "ramda";

import { container, title, input, button, buttonText } from "../Styles";
import { validateEmail, showAlert, validatePassword } from "../Utils";

const styles = StyleSheet.create({
  container,
  title,
  input,
  button,
  buttonText,
});

const parseJSON = R.tryCatch(JSON.parse, () => null);

const SignUp = (props) => {
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [password, setPassword] = useState(null);

  const signUp = () => {
    const { createAccount } = props;

    console.log({
      email: validateEmail(username),
      password: validatePassword(password),
    });
    console.log({ fullName });
    if (!fullName || fullName.length == 0) {
      showAlert("Sign Up Failed", "Name can not be empty");
      return;
    } else if (validateEmail(username) == false) {
      showAlert("Sign Up Failed", "Email is not valid");
      return;
    } else if (validatePassword(password) == false) {
      showAlert("Sign Up Failed", "Password must be at least 8 characters");
      return;
    } else if (password !== passwordConfirmation) {
      showAlert("Sign Up Failed", "Password not equal confirmation password");
      return;
    }
    createAccount({ fullName, username, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>InPlayer Demo</Text>
      <TextInput
        autoCapitalize="characters"
        placeholder="Enter your name"
        placeholderTextColor={"white"}
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        placeholderTextColor={"white"}
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor={"white"}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password Confirmation"
        placeholderTextColor={"white"}
        style={styles.input}
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />

      <TouchableOpacity onPress={signUp}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
