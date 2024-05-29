import { useCallback, useState } from "react";
import { Platform, Pressable, StyleSheet, ViewStyle } from "react-native";
import { View } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import { CourseYear } from "@/type/interface";

interface ActionButtonsProps {
  onEditCourseYear: (course: CourseYear) => void;
  onCreateCourse: () => void;
  setShowDeleteConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  styles: {
    editView: ViewStyle;
    acctionIcon: ViewStyle;
  };
  courseYear: string;
}

/**
 * Renders a component that displays action buttons for the menu header.
 *
 * @param {ActionButtonsProps} props - The props object containing the following properties:
 *   - onEditCourseYear: A function to handle the edit course year action.
 *   - onCreateCourse: A function to handle the create course action.
 *   - setShowDeleteConfirmationModal: A function to set the state of the delete confirmation modal.
 *   - styles: An object containing the styles for the edit view and action icon.
 *   - courseYear: The current course year.
 * @return {JSX.Element} The rendered component.
 */
export const MenuHeaderActionButtons: React.FC<ActionButtonsProps> = (
  props
) => {
  const {
    onEditCourseYear,
    onCreateCourse,
    setShowDeleteConfirmationModal,
    styles,
    courseYear,
  } = props;
  const [toggleCourseInputForm, setToggleCourseInputForm] = useState(false);
  const handleEditPress = useCallback(
    () => onEditCourseYear({ courseYear }),
    [courseYear, onEditCourseYear]
  );
  const handlePlusPress = useCallback(
    () => setToggleCourseInputForm((prev) => !prev),
    []
  );
  const handleTrashPress = useCallback(
    () => setShowDeleteConfirmationModal(true),
    [setShowDeleteConfirmationModal]
  );

  return (
    <View style={styles.editView}>
      <Pressable
        style={[styles.acctionIcon, { backgroundColor: "#03a9f4" }]}
        onPress={handleEditPress}
      >
        <FontAwesome name="edit" size={20} color={"white"} />
      </Pressable>
      <Pressable
        style={[styles.acctionIcon, { backgroundColor: "#32CD32" }]}
        onPress={handlePlusPress}
      >
        <FontAwesome name="plus-circle" size={23} color={"white"} />
      </Pressable>
      <Pressable
        style={[styles.acctionIcon, { backgroundColor: "#f44336" }]}
        onPress={handleTrashPress}
      >
        <FontAwesome name="trash" size={25} color={"white"} />
      </Pressable>
    </View>
  );
};
