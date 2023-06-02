import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkKeyExists = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    // console.log(value);
    console.log(`key: ${key}`);
    return value !== null; // Returns true if value exists, false otherwise
  } catch (error) {
    console.log(error);
    return false; // Return false on error
  }
};
