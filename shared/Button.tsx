import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface FlatButtonProps {
  onPress: () => void;
  text: string;
  // pressHandler: (values: any) => void;
  disabled: boolean;
}

export const FlatButton = ({ onPress, text }: FlatButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
};

export const RegularButton = ({ onPress, text, customStyle }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.falseButton}>
      <View style={[styles.button, customStyle]}>
        <Text style={styles.buttonText}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f01d71",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  falseButton: {
    marginTop: 5,
  },
});
