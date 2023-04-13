import { Formik } from "formik";
import React, { useState } from "react";
import { signup, signin } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { selectPrestate } from "../../redux/prestate/selectors";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {
  initialRegistr,
  validationRegistr,
  initialLogin,
  validationLogin,
} from "../../services/initial";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const { userId } = useSelector(selectUser);
  const { uri } = useSelector(selectPrestate);

  const chengHidePassword = () => setHidePassword(!hidePassword);

  const submitForm = (values, { resetForm }) => {
    if (type === "auth") dispatch(signin(values));
    else dispatch(signup({ ...values, photoURL: uri }));
    userId && resetForm();
  };

  return (
    <Formik
      initialValues={type === "auth" ? initialLogin : initialRegistr}
      onSubmit={submitForm}
      validationSchema={type === "auth" ? validationLogin : validationRegistr}
    >
      {({
        handleChange,
        values: { displayName, email, password },
        errors,
        touched,
        handleSubmit,
        handleBlur,
      }) => (
        <View style={styles.form}>
          <Text
            style={{
              ...styles.formTitle,
              marginTop: type === "auth" ? 32 : 92,
            }}
          >
            {type === "auth" ? "Login" : "Registration"}
          </Text>
          <View style={styles.inputBlock}>
            {type === "registr" && (
              <>
                <TextInput
                  style={styles.input}
                  value={displayName}
                  onChangeText={handleChange("displayName")}
                  onBlur={handleBlur("displayName")}
                  placeholder="Login"
                  autoCapitalize="none"
                />
                <Text style={styles.error}>
                  {touched.displayName && errors.displayName}
                </Text>
              </>
            )}
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="E-mail address"
              inputMode="email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.error}>{touched.email && errors.email}</Text>
            <View style={styles.passwordField}>
              <TextInput
                style={styles.input}
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="Password"
              />
              <TouchableOpacity
                style={styles.showBtn}
                onPress={chengHidePassword}
              >
                <Text style={styles.showBtnTitle}>Show</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.error}>
              {touched.password && errors.password}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={handleSubmit}
          >
            <Text style={styles.btnTitle}>
              {type === "auth" ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
    keyboard: {
      flex: 1,
      width: "100%",
    },
    form: {
      width: "100%",
    },
    formTitle: {
      textAlign: "center",
      color: "#212121",
      marginBottom: 32,
    //   fontFamily: "Roboto-Bold",
      fontSize: 30,
      lineHeight: 35,
      textAlign: "center",
    },
    inputBlock: {
      display: "flex",
    },
    input: {
      display: "flex",
      height: 50,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      padding: 16,
      borderRadius: 8,
      color: "#212121",
    },
    passwordField: {
      position: "relative",
      justifyContent: "center",
    },
    showBtn: {
      position: "absolute",
      right: 16,
    },
    showBtnTitle: {
      fontSize: 16,
      lineHeight: 19,
      color: "#1B4371",
    },
    btn: {
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      marginTop: 27,
      justifyContent: "center",
      alignItems: "center",
    },
    btnTitle: {
      color: "#FFFFFF",
      paddingVertical: 16,
      textAlign: "center",
      fontSize: 16,
      lineHeight: 19,
    },
    link: {
      marginTop: 16,
      textAlign: "center",
      fontSize: 16,
      lineHeight: 19,
      color: "#1B4371",
    },
    error: {
      height: 16,
      color: "red",
    },
  });
  

export default AuthForm;