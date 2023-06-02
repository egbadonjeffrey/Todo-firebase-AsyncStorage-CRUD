import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Signup } from "./signUp";

interface SignupModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignupModal = ({ openModal, setOpenModal }: SignupModalProps) => {
  console.log(openModal);
  return (
    <SafeAreaView>
      <Modal
        visible={openModal}
        animationType="slide"
        style={styles.modalContainer}
      >
        <View>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="cancel"
              size={40}
              onPress={() => setOpenModal(false)}
              style={styles.modalClose}
            />

            <Signup />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginVertical: 40,
  },
  modalContent: {},
  modalClose: {
    width: "10%",
    marginTop: 50,
    alignSelf: "center",
    textAlign: "center",
  },
});
