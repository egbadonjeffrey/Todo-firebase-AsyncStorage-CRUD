import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const Header = ({ title }: any) => {
  const navigation = useNavigation();
  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    console.log("Opened");
  };
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerContent}>
        <MaterialIcons
          name="menu"
          size={40}
          onPress={openMenu}
          style={styles.icon}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#dddd",
    height: 100,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#444",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
    padding: 5,
    color: "#444",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
});
