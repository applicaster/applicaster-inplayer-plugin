import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../Utils/Account";
import { container, title, input, button, buttonText } from "../Styles";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    ...container,
    width: Dimensions.get("window").width,
  },
  title,
  input,
  button,
  buttonText,
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 35,
    marginTop: 20,
  },
  backButtonText: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
  },
  newUserButton: {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  newUserButtonText: {
    color: "rgba(169, 169, 169, 1)",
    fontFamily: "Montserrat",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  remindPassword: {
    color: "rgba(169, 169, 169, 1)",
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    marginBottom: 30,
  },
});

export const Login = (props) => {
  const { initialEmail } = props;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const login = () => {
    const { login, onLoginError } = props;

    const title = "Login form issue";

    if (validateEmail(email) == false) {
      onLoginError({
        title,
        message: "Email is not valid",
      });
      return;
    }
    login({ email, password });
  };

  const onBackButton = () => {
    const { accountFlowCallback } = props;
    accountFlowCallback && accountFlowCallback(false);
  };

  const { backButton } = props;

  return (
    <View style={styles.container}>
      {backButton === true ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>InPlayer Demo</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        placeholderTextColor={"white"}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
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
      <Text style={styles.remindPassword}>Forgot your password?</Text>
      <TouchableOpacity onPress={login}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props?.signUp}>
        <View style={styles.newUserButton}>
          <Text style={styles.newUserButtonText}>No user? Sign Up!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
