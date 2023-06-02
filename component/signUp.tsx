import { StyleSheet, View, TextInput, Text, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { FlatButton, RegularButton } from "../shared/Button";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { checkKeyExists } from "../helper/checkKey";
import { storeKeyHandler } from "../helper/storeKey";
import { useNavigationContext } from "../context/NavigationRef";

const signupSchema = yup.object({
  email: yup.string().required().min(4),
  username: yup.string().required().min(2),
  password: yup.string().required().min(6),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number format")
    .max(15),
});

export const Signup = (props: any) => {
  const [user, setUser] = useState<object | null>(null);
  const auth = getAuth();
  const firestore = getFirestore();
  const { navigationRef } = useNavigationContext();

  interface FormValues {
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
  }

  const storeUserData = async (uid: string, phoneNumber: string) => {
    try {
      const userRef = doc(collection(firestore, "users"), uid); // Replace "users" with your own collection name
      await setDoc(userRef, { phoneNumber }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const email = values.email;
    const username = values.username;
    const password = values.password;
    const phone = values.phoneNumber;

    const { resetForm } = formikHelpers;

    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const user = auth.currentUser;
          setUser(user);
          if (user) {
            await storeUserData(user.uid, phone);
            console.log(phone);
            updateProfile(auth.currentUser, {
              displayName: username,
            })
              .then(() => {
                // Profile updated!
                console.log(user.displayName);
                if (user) {
                  // store key
                  handleStoreKey(user.providerData);
                  // navigate to home
                }
              })
              .catch((error) => {
                // An error occurred
                console.log(error);
              });
          }
        }
      );
      resetForm();

      navigationRef.current?.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreKey = async (user: any) => {
    await storeKeyHandler("user", user);
  };

  const handleCheckUser = async () => {
    const keyExists = await checkKeyExists("user");
    if (keyExists) {
      // Key exists in AsyncStorage
      console.log("Key exists");
    } else {
      // Key does not exist in AsyncStorage
      console.log("Key does not exist");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          phoneNumber: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values, formikHelpers) => {
          handleSubmit(values, formikHelpers);
        }}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <View style={styles.form}>
            <View style={styles.inputLabel}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#333"
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
              />
              <Text style={styles.errorText}>
                {touched.email && errors.email}
              </Text>
            </View>
            <View style={styles.inputLabel}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#333"
                onChangeText={handleChange("username")}
                value={values.username}
                onBlur={handleBlur("username")}
              />
              <Text style={styles.errorText}>
                {touched.username && errors.username}
              </Text>
            </View>
            <View style={styles.inputLabel}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#333"
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
              />
              <Text style={styles.errorText}>
                {touched.password && errors.password}
              </Text>
            </View>

            <View style={styles.inputLabel}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#333"
                onChangeText={handleChange("phoneNumber")}
                value={values.phoneNumber}
                onBlur={handleBlur("phoneNumber")}
              />
              <Text style={styles.errorText}>
                {touched.phoneNumber && errors.phoneNumber}
              </Text>
            </View>

            <FlatButton
              onPress={handleSubmit}
              // pressHandler={handleSubmit}
              text="Signup"
              disabled={!isValid}
            />
            <RegularButton
              onPress={handleCheckUser}
              text="Check"
              disabled={user !== null ? true : false}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  form: {
    padding: 20,
    marginTop: 40,
    // color,
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
