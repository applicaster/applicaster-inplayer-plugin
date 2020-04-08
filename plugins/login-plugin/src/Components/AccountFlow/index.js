import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import R from "ramda";
import { Keyboard } from "react-native";
import { Login } from "../Login";
import LoadingScreen from "../LoadingScreen";
import SignUp from "../SignUp";
import { container } from "../Styles";
import { AccountModule } from "../../NativeModules/AccountModule";
// https://github.com/testshallpass/react-native-dropdownalert#usage
import DropdownAlert from "react-native-dropdownalert";

// callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void,

const parseJSON = R.tryCatch(JSON.parse, () => null);
const styles = StyleSheet.create({
  container,
});
const AccountFlow = (props) => {
  const riverScreen = Object.values(props.rivers).find(
    (river) => river.type === "my-plugin-identifier"
  );

  const ScreensData = {
    EMPTY: "Empty",
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    FORGOT_PASSWORD: "ForgotPassword",
  };
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(ScreensData.EMPTY);

  useEffect(() => {
    const { configuration } = props;
    // Check is Autheticated
    AccountModule.isAuthenticated(configuration)
      .then((isLogedIn) => {
        setLoading(false);
        isLogedIn == true ? onSuccess() : setScreen(ScreensData.LOGIN);
      })
      .catch((err) => {});
  }, []);

  const onSuccess = () => {
    const { accountFlowCallback } = props;
    setLoading(false);
    accountFlowCallback({ success: true });
    // callback &&
    //   callback({ success: true, error: null, payload: props.payload });
  };

  const onFail = (error, errorMessage) => {
    const { accountFlowCallback } = props;
    const { code = -1, message = "Unknown Error" } = error;
    setLoading(false);
    accountFlowCallback({ success: false });
    this.dropDownAlertRef.alertWithType(
      "error",
      errorMessage,
      `Code:${code}, ${message}`
    );
  };

  const login = (payload) => {
    Keyboard.dismiss();
    const { configuration } = props;
    setLoading(true);
    AccountModule.authenticate({ ...payload, ...configuration })
      .then((data) => {
        onSuccess();
      })
      .catch((e) => {
        onFail(e, "Error: Authentication Failed");
      });
  };
  const signUp = () => {
    setScreen(ScreensData.SIGN_UP);
  };

  const onSiginUpBack = () => {
    setScreen(ScreensData.LOGIN);
  };

  console.disableYellowBox = true;

  createAccount = (payload) => {
    Keyboard.dismiss();
    const { configuration } = props;
    setLoading(true);
    const { callback } = props;
    AccountModule.signUp({ ...payload, ...configuration })
      .then((data) => {
        onSuccess();
      })
      .catch((e) => {
        onFail(e, "Error: Error: Sign Up Failed");
      });
  };

  onLoginError = ({ title, message }) => {
    this.dropDownAlertRef.alertWithType("warn", title, message);
  };

  onSignUpError = ({ title, message }) => {
    this.dropDownAlertRef.alertWithType("warn", title, message);
  };
  const renderAuthenteficationScreen = () => {
    if (!screen) {
      return null;
    }
    switch (screen) {
      case ScreensData.LOGIN:
        return (
          <Login
            login={login}
            signUp={signUp}
            onLoginError={onLoginError}
            {...props}
          />
        );

      case ScreensData.SIGN_UP:
        return (
          <SignUp
            createAccount={createAccount}
            onSiginUpBack={onSiginUpBack}
            onSignUpError={onSignUpError}
            {...props}
          />
        );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {renderAuthenteficationScreen()}
        {loading && <LoadingScreen />}
      </SafeAreaView>
      <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
    </View>
  );
};

export default AccountFlow;
