import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyDrawer from "./routes/Drawer";
import { MyContextProvider } from "./context/MyContext";
import {
  NavigationContextProvider,
  useNavigationContext,
} from "./context/NavigationRef";
import { useEffect } from "react";

export default function App() {
  const { navigationRef } = useNavigationContext();

  useEffect(() => {
    // Save the navigation reference to the context
    navigationRef.current = navigationRef.current;
  }, [navigationRef]);
  return (
    <NavigationContextProvider>
      <MyContextProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <MyDrawer />
          </NavigationContainer>
        </SafeAreaProvider>
      </MyContextProvider>
    </NavigationContextProvider>
  );
}
