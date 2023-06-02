import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { RegularButton } from "../shared/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";

export default function LogOut(props: any) {
  const logout = async () => {
    const auth = getAuth();
    // Clear Firebase authentication state
    await signOut(auth)
      .then(() => {
        // Clear AsyncStorage data
        AsyncStorage.clear();
        ``;
        console.log("Logout successfully");
        // Navigate to login screen
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <RegularButton
      text="Log out"
      onPress={() => logout()}
      style={styles.buttonContainer}
    />
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
  },
});
