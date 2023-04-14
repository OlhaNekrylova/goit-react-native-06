import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { selectPrestate } from "../redux/prestate/selectors";
import { selectImage, updateImage } from "../services/ImagePicker";
import { delPhoto } from "../redux/prestate/operations";
import { selectUser } from "../redux/auth/selectors";

const Avatar = () => {
    const dispatch = useDispatch();
    const { userId, photoURL } = useSelector(selectUser);
    const { uri } = useSelector(selectPrestate);
    const avatarURL = photoURL || uri;
  
    const changeImage = () => {
      if (!avatarURL && !userId) return selectImage(dispatch);
      if (uri) return dispatch(delPhoto(uri));
      updateImage(dispatch, photoURL);
    };
  
    return (
      <View style={styles.add}>
        {avatarURL && <Image style={styles.avatar} source={{ uri: avatarURL }} />}
        <TouchableOpacity
          style={{
            ...styles.btnAdd,
            backgroundColor: avatarURL ? "#FFFFFF" : "inherit",
            borderColor: avatarURL ? "#BDBDBD" : "#FF6C00",
          }}
          onPress={changeImage}
        >
          <Feather
            name={avatarURL ? "x" : "plus"}
            size={13}
            color={avatarURL ? "#BDBDBD" : "#FF6C00"}
          />
        </TouchableOpacity>
      </View>
    );
  };
  

  const styles = StyleSheet.create({
    add: {
      position: "absolute",
      top: -60,
      width: 120,
      height: 120,
      backgroundColor: "#F6F6F6",
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    avatar: {
      flex: 1,
      width: "100%",
      resizeMode: "cover",
      borderRadius: 16,
    },
    btnAdd: {
      position: "absolute",
      bottom: 14,
      right: -12,
  
      width: 25,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 50,
      zIndex: 2,
    },
  });

export default Avatar;