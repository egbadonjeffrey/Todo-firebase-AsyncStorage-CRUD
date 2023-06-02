import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../app/screens/List";
import Details from "../app/screens/Details";
import { Header } from "../shared/Header";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={List}
        options={{
          header: () => <Header title="My Todos" />,
        }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};
