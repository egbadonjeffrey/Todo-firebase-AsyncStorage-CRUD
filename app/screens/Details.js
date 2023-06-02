import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { RegularButton } from "../../shared/Button";
import { doc, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from "yup";
import { FIRESTORE_DB } from "../../firebaseConfig";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const Details = ({ navigation }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const route = useRoute();
  const { item } = route.params;

  console.log(item);

  const handleSetUpdate = () => {
    setUpdateMode(true);
  };

  const handleUpdate = async (values) => {
    console.log(values.title);
    try {
      const updateRef = doc(FIRESTORE_DB, "todos", item.id);

      await updateDoc(updateRef, {
        title: values.title,
      });
      setUpdateMode(false);
      navigation.navigate("Home");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="edit"
        size={24}
        color="black"
        style={styles.editIcon}
        onPress={handleSetUpdate}
      />
      {updateMode ? (
        <Formik
          initialValues={{ title: item.title }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.updateContainer}>
              <TextInput
                multiline
                style={styles.input}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
              <RegularButton
                text="Update"
                onPress={handleSubmit}
                style={styles.updateButton}
              />
            </View>
          )}
        </Formik>
      ) : (
        <Text style={styles.title}>{item.title}</Text>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "90%",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  editIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "#fff",
  },
  updateContainer: {
    width: "100%",
    padding: 20,
  },
  input: {
    color: "#fafafa",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingHorizontal: 10,
    marginVertical: 30,
    fontSize: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
