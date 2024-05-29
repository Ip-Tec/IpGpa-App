import { Text, View } from "@/components/Themed";
import { Modal, Pressable, StyleSheet } from "react-native";
interface DeleteConfirmationModalProps {
  showDeleteConfirmationModal: boolean;
  setShowDeleteConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteCourse: () => Promise<void>;

  courseYear: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 15,
    width: "95%",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#f25050",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
  },
  headerText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  text: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  buttonCancel: {
    backgroundColor: "#03a9f4",
  },
  buttonDelete: {
    backgroundColor: "#f44336",
  },
});

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
  handleDeleteCourse,
  courseYear,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={showDeleteConfirmationModal}
    onRequestClose={() => setShowDeleteConfirmationModal(false)}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            You are about to delete {courseYear}
          </Text>
        </View>
        <Text style={styles.text}>
          Are you sure you want to delete this course year?
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.buttonCancel]}
            onPress={() => setShowDeleteConfirmationModal(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonDelete]}
            onPress={handleDeleteCourse}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);
