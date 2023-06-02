import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import LogOut from "./logOut";
import { MyContext } from "../context/MyContext";

const CustomDrawerContent = (props: any) => {
  const { username } = useContext(MyContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <DrawerItemList {...props} />
        {username && username !== "" ? (
          <View style={styles.buttonContainer}>{<LogOut {...props} />}</View>
        ) : (
          ""
        )}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});
