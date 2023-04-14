import React from "react";
import Container from "../../components/Container";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";
import { useKeyboard } from "../../services/hooks";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Platform, KeyboardAvoidingView, TouchableWithoutFeedback,
  Keyboard, Animated, } from "react-native";
import styles from "../../components/AuthForm/AuthForm.styles";

const Registr = ({ navigation }) => {
  const { marginСompensator } = useKeyboard(78);
  const keyboardHide = () => Keyboard.dismiss();

  return (
    <>
      <Loader />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <Container>
            <Avatar />
            <AuthForm type={"registr"} />
            <Animated.Text
              style={{ ...styles.link, ...marginСompensator }}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account? Sign In
            </Animated.Text>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Registr;
