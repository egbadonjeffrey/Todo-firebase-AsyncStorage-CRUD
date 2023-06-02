import { createDrawerNavigator } from "@react-navigation/drawer";
import { Login } from "../app/screens/Login";
import { Header } from "../shared/Header";
import { HomeStack } from "./HomeStack";
import CustomDrawer from "../component/customDrawer";
import { useNavigationContext } from "../context/NavigationRef";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { useEffect } from "react";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Todos"
        component={HomeStack}
        initialParams={{ initialRoute: true }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <Header title="Login" />,
        }}
      />
    </Drawer.Navigator>
  );
}
