import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAo-ORWA063jA2vH5ElyyN5tC0kddnF89A",
    authDomain: "goit-react-native-b4053.firebaseapp.com",
    projectId: "goit-react-native-b4053",
    storageBucket: "goit-react-native-b4053.appspot.com",
    messagingSenderId: "574411218039",
    appId: "1:574411218039:web:3a9747b7688e4b358a7a72",
    measurementId: "G-N111GK1P5G"
};

const authConfig = initializeApp(firebaseConfig);
const auth = getAuth(authConfig);
const db = getFirestore(authConfig);
const storage = getStorage(authConfig);

export { auth, db, storage };