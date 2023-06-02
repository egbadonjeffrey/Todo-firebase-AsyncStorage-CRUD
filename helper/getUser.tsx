import { checkKeyExists } from "../helper/checkKey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const getUser = async () => {
  const keyExists = await checkKeyExists("user");
  if (keyExists) {
    // Key exists in AsyncStorage
    const userValues = await AsyncStorage.getItem("user");
    const parsedUserValues = userValues ? JSON.parse(userValues) : null;

    if (
      parsedUserValues &&
      Array.isArray(parsedUserValues) &&
      parsedUserValues.length > 0
    ) {
      const userObject = parsedUserValues[0];
      console.log(`${userObject.displayName}`);
      // console.log(`Email: ${userObject.email}`);
      // console.log(`Provider ID: ${userObject.providerId}`);
      // console.log(`UID: ${userObject.uid}`);
      // console.log(`Phone Number: ${userObject.phoneNumber}`);
      // console.log(`Photo URL: ${userObject.photoURL}`);
    } else {
      console.log("Invalid or empty parsedUserValues.");
    }
  } else {
    // Key does not exist in AsyncStorage
    console.log("Key does not exist");
  }
};

export const checkUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();

      if (user) {
        const uid = user.uid;
        const name = user.displayName;
        console.log(name);
        resolve(name);
      } else {
        console.log("user not found");
        reject(new Error("User not found"));
      }
    });
  });
};
