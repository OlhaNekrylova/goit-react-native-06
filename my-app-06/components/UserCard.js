import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

const UserCard = () => {
  const { nickName, email, photoURL } = useSelector(selectUser);
  return (
    <View style={styles.user}>
      {photoURL ? (
        <Image style={styles.image} source={{ uri: photoURL }} />
      ) : (
        <View style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{nickName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    user: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 8,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 16,
      backgroundColor: "#F6F6F6",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      color: "#212121CC",
    },
    name: {
    //   fontFamily: "Roboto-Bold",
      fontWeight: 700,
      fontSize: 24,
    },
    email: {
    //   fontFamily: "Roboto-Regular",
      fontSize: 18,
    },
  });
  

export default UserCard;