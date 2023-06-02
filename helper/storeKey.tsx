import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeKeyHandler = async (
  key: string,
  user: any
): Promise<void> => {
  //   Store the user in local storage
  await AsyncStorage.setItem(key, JSON.stringify(user))
    .then(() => {
      console.log(`User stored in local storage: ${user}`);
      return;
    })
    .catch((error) => {
      console.log("Error storing user:", error);
    });
};
