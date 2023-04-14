import Moment from "moment";
import "moment/locale/ru";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { selectIsLoading } from "../../redux/prestate/selectors";
import { selectComments } from "../../redux/data/selectors";
import { createComment, getComments } from "../../redux/data/operations";
import { View, Text, Image, Alert, Keyboard, FlatList, TextInput,
  TouchableOpacity, RefreshControl, StyleSheet } from "react-native";

const Comments = ({
  route: {
    params: { postId, uri },
  },
}) => {
  Moment.locale("ru");
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);
  const commentHandler = (value) => setComment(value);
  const handleSend = () => {
    Keyboard.dismiss();
    if (comment.length < 5)
      return Alert.alert("Please enter a comment with at least 5 characters");
    const currentDate = Moment().format("DD.MM.YYYY");
    const currentTime = Moment().format("HH:mm");
    const { userId, photoURL } = user;
    dispatch(
      createComment({
        postId,
        userId,
        photoURL,
        comment,
        timeStamp: `${currentDate} | ${currentTime}`,
      })
    );
    setComment("");
    dispatch(getComments());
  };

  const onRefresh = () => {
    setComment("");
    dispatch(getComments());
  };
  const isLoading = useSelector(selectIsLoading);
  const comments = useSelector(selectComments);
  const commentsFiltred = comments.filter(
    (comment) => comment.postId === postId
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{ uri }} />
      </View>
      <FlatList
        style={styles.list}
        data={commentsFiltred}
        keyExtractor={(item) => item.comentId}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={"#FF6C00"}
            progressBackgroundColor={"inherit"}
            colors={["#FF6C00"]}
          />
        }
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.item,
              flexDirection:
                item.userId === user.userId ? "row-reverse" : "row",
            }}
          >
            <View style={styles.avatarBox}>
              <Image style={styles.avatar} source={{ uri: item.photoURL }} />
            </View>
            <View
              style={
                item.userId === user.userId
                  ? styles.ownerComment
                  : styles.guestComment
              }
            >
              <Text style={styles.coment}>{item.comment}</Text>
              <Text
                style={{
                  ...styles.data,
                  textAlign: item.userId === user.userId ? "left" : "right",
                }}
              >
                {item.timeStamp}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          onChangeText={commentHandler}
          placeholder="Comment..."
          value={comment}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnSend}
          onPress={handleSend}
        >
          <Feather name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    // fontFamily: "Roboto-Regular",
    justifyContent: "space-between",
  },
  imageBox: {
    width: "100%",
    height: 240,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  list: {
    width: "100%",
    marginVertical: 20,
  },
  item: {
    width: "100%",
    marginVertical: 12,
    gap: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    resizeMode: "cover",
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
  },
  avatarBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  guestComment: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  ownerComment: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  coment: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    textAlign: "left",
  },
  data: {
    color: "#BDBDBD",
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
  },
  inputBox: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 59,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 50,
    borderRadius: 100,
    color: "#212121",
    fontSize: 16,
  },
  btnSend: {
    position: "absolute",
    width: 34,
    height: 34,
    right: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Comments;