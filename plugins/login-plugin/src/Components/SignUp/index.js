import React, { useState } from "react";

import { View, TextInput } from "react-native";
import { inputFieldStyle } from "../../Utils/Customization";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDimensions } from "@applicaster/zapp-react-native-utils/reactHooks/layout";

import { container } from "../Styles";
import { validateEmail, validatePassword } from "../../Utils/Account";
import ActionButton from "../UIComponents/ActionButton";
import TitleLabel from "../UIComponents/TitleLabel";
import BackButton from "../UIComponents/BackButton";

const SignUp = (props) => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [password, setPassword] = useState(null);
  const { screenStyles } = props;
  const textInputStyle = inputFieldStyle(screenStyles);
  const { width: screenWidth } = useDimensions("window");

  const signUp = () => {
    const { createAccount, onSignUpError } = props;
    const errorData = validateData();
    if (errorData) {
      onSignUpError(errorData);
    }
    createAccount({ fullName, email, password });
  };

  const validateData = () => {
    const title = "Sign Up form issue";
    const message = null;
    if (!fullName || fullName.length == 0) {
      message = "Name can not be empty";
    } else if (validateEmail(email) == false) {
      message = "Email is not valid";
    } else if (validatePassword(password) == false) {
      message = "Password must be at least 8 characters";
    } else if (password !== passwordConfirmation) {
      message = "Password not equal confirmation password";
    }
    return message ? { title, message } : null;
  };

  return (
    <View style={{ ...container, width: screenWidth }}>
      <BackButton screenStyles={screenStyles} onPress={props?.onSiginUpBack} />
      <KeyboardAwareScrollView
        extraScrollHeight={50}
        enableOnAndroid={true}
        scrollEnabled={false}
      >
        <TitleLabel
          screenStyles={screenStyles}
          title={screenStyles?.title_font_text}
        />
        <TextInput
          onSubmitEditing={() => {
            this.emailTextInput.focus();
          }}
          blurOnSubmit={false}
          autoCapitalize="words"
          placeholder={screenStyles?.fields_name_text || "Enter your name"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          ref={(input) => {
            this.emailTextInput = input;
          }}
          onSubmitEditing={() => {
            this.passwordTextInput.focus();
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={screenStyles?.fields_email_text || "E-mail"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          ref={(input) => {
            this.passwordTextInput = input;
          }}
          onSubmitEditing={() => {
            this.passwordConfirmationTextInput.focus();
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={screenStyles?.fields_password_text || "Password"}
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          ref={(input) => {
            this.passwordConfirmationTextInput = input;
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder={
            screenStyles?.fields_password_confirmation_text ||
            "Password Confirmation"
          }
          placeholderTextColor={
            screenStyles?.fields_placeholder_font_color || "white"
          }
          style={textInputStyle}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
        />

        <ActionButton
          screenStyles={screenStyles}
          title={screenStyles?.action_button_signup_text || "SIGN UP"}
          onPress={signUp}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
