import { StyleSheet, View, TextInput, Text, SafeAreaView } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { FlatButton, RegularButton } from "../../shared/Button";
import { useState } from "react";
import { SignupModal } from "../../component/modal";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { storeKeyHandler } from "../../helper/storeKey";

interface FormValues {
  email: string;
  password: string;
}

export const Login = (props: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const auth = getAuth();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const loginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const email = values.email;
    const password = values.password;
    const { resetForm } = formikHelpers;

    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user.providerData;

          if (user) {
            // Store the user in local storage
            handleStoreKey(user);
            // navigate to home
            props.navigation.navigate("Home");
          }
        }
      );
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreKey = async (user: any) => {
    await storeKeyHandler("user", user);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
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

            <FlatButton
              onPress={handleSubmit}
              text="Login"
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>

      <RegularButton
        onPress={handleModal}
        pressHandler={handleModal}
        text="Create Account"
      />

      <SignupModal openModal={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  form: {
    marginTop: 40,
    paddingBottom: 10,
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
