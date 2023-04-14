import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import { useKeyboard } from "../../services/hooks";
import { initialPost } from "../../services/initial";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { createPost, getPosts } from "../../redux/data/operations";
import { delPhoto } from "../../redux/prestate/operations";
import { takePhoto } from "../../services/ImagePicker";
import { selectPrestate } from "../../redux/prestate/selectors";
import GetCurrentLocation from "../../services/location";
import { Text, View, Alert, Image, TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard, StyleSheet
} from "react-native";

const CreatePosts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isShowKeyboard } = useKeyboard(0);
  const [state, setState] = useState(initialPost);
  const { uri } = useSelector(selectPrestate);
  const { name, adress, coordinate } = state;
  const author = useSelector(selectUser);

  const imageHandler = () => takePhoto(dispatch);
  const nameHandler = (value) =>
    setState((prevState) => ({ ...prevState, name: value }));
  const adressHandler = (value) =>
    setState((prevState) => ({ ...prevState, adress: value }));
  const handleSubmit = () => {
    if (!uri || !name || !adress)
      return Alert.alert("Not all fields are filled!");
    Keyboard.dismiss();
    dispatch(createPost({ author, uri, name, adress, coordinate }));
    setState(initialPost);
    dispatch(getPosts());
    navigation.navigate("Posts");
  };

  const keyboardHide = () => Keyboard.dismiss();
  const handleDel = () => {
    dispatch(delPhoto(uri));
    setState(initialPost);
  };

  useEffect(() => {
    uri && GetCurrentLocation({ setState });
  }, [uri]);

  return (
    <>
      <Loader />
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ marginTop: isShowKeyboard ? -50 : 0 }}>
            {uri ? (
              <Image source={{ uri }} style={styles.imageBox} />
            ) : (
              <View style={styles.imageBox}>
                <TouchableOpacity
                  style={styles.cameraButton}
                  activeOpacity={0.8}
                  onPress={imageHandler}
                >
                  <Feather name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.text}>Upload a photo</Text>
            <View style={styles.inputBlock}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={nameHandler}
                placeholder="Name..."
              />
              <View style={styles.locationField}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.locationIcon}
                />
                <TextInput
                  style={{ ...styles.input, ...styles.locationInput }}
                  onChangeText={adressHandler}
                  placeholder="Location..."
                  value={adress}
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>Publish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnTrashBox}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnTrash}
              onPress={handleDel}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
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
  cameraButton: {
    width: 60,
    height: 60,
    borderColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#BDBDBD",
    textAlign: "left",
    marginTop: 8,
    fontSize: 16,
    // fontFamily: "Roboto-Regular",
  },
  inputBlock: {
    marginVertical: 32,
    gap: 16,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
    color: "#212121",
    fontSize: 16,
    // fontFamily: "Roboto-Regular",
  },
  locationInput: {
    paddingLeft: 28,
  },
  locationField: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    marginRight: 4,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
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
  btnTrashBox: {
    position: "absolute",
    width: "100%",
    bottom: 34,
    left: 15,
    alignItems: "center",
  },
  btnTrash: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePosts;