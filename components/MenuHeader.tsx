// file: @/component/MenuHeader.tsx
import React, { useCallback, useState } from "react";
import { TouchableOpacity, Platform } from "react-native";
import { View, Text } from "@/components/Themed";
import { MenuStyle } from "@/components/CSSStyle";
import { deleteCoursesByYear } from "@/constants/Crud";
import { CourseYear } from "@/type/interface";
import { MenuHeaderActionButtons } from "./MenuHeaderActionButtons";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { GPA } from "@/constants/Calculate";

type MenuHeaderProps = {
  totalCourseUnit: number;
  totalCourses: number;
  totalGPA: number;
  textColor: string;
  courseYear: string;
  toggleCollapse: () => void;
  toggleModal: () => void;
  courseDataArrayNumber: number | undefined;
};

const MenuHeader: React.FC<MenuHeaderProps> = ({
  totalCourseUnit,
  totalCourses,
  totalGPA,
  textColor,
  courseYear,
  toggleCollapse,
  toggleModal,
  courseDataArrayNumber,
}) => {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const handleDeleteCourse = async () => {
    setShowDeleteConfirmationModal(false);

    const message = await deleteCoursesByYear(courseYear);
    console.log({ message });
    // toggleModal();
  };

  const getBorderColor = (gpa: number) => {
    if (gpa >= 3.5) return "#4caf50"; // green
    if (gpa >= 3.0) return "#ffeb3b"; // yellow
    if (gpa >= 2.5) return "#03a9f4"; // blue
    return "#f44336"; // red
  };

  const styles = {
    card: {
      ...MenuStyle.card,
      borderLeftColor: getBorderColor(totalGPA),
      borderBottomColor: getBorderColor(totalGPA),
    },

    editView: {
      ...MenuStyle.editView,
      borderLeftColor: getBorderColor(totalGPA),
    },

    acctionIcon: {
      ...MenuStyle.acctionIcon,
      backgroundColor: Platform.OS === "android" ? "green" : "transparent",
      borderWidth: Platform.OS === "android" ? 0 : 1,
      borderColor: "transparent",
    },

    button: {
      backgroundColor: "transparent",
      padding: 10,
      borderRadius: 5,
      borderColor: "transparent",
    },

    buttonClose: {
      backgroundColor: "#03a9f4",
      borderColor: "transparent",
      marginRight: 8,
    },

    buttonDelete: {
      backgroundColor: "#f44336",
      borderColor: "transparent",
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: Platform.OS === "android" ? 0 : 22,
    },

    modalView: {
      backgroundColor: "white",
      width: "95%",
      overflow: "hidden",
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    modalTextHeader: {
      padding: 10,
      fontSize: 28,
      width: "100%",
      color: "#fff",
      marginBottom: 5,
      textAlign: "center",
      backgroundColor: "#f44336",
    },

    modalText: {
      margin: 20,
      marginBottom: 15,
      textAlign: "center",
    },

    buttonContainer: {
      margin: 20,
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  return (
    <TouchableOpacity onPress={toggleCollapse} style={styles.card}>
      <View style={MenuStyle.cardHeader}>
        <View style={MenuStyle.cardHeader2}>
          <View style={MenuStyle.cardHeader3}>
            <Text
              style={[
                MenuStyle.levelText,
                {
                  color: textColor,
                  transform: "",
                  textTransform: "capitalize",
                },
              ]}
            >
              {courseYear}
            </Text>
            <View style={MenuStyle.infoContainer}>
              <Text style={[MenuStyle.infoText, { color: textColor }]}>
                Total Unit: {totalCourseUnit}
              </Text>
              <Text style={[MenuStyle.infoText, { color: textColor }]}>
                Total Courses: {totalCourses}
              </Text>
            </View>
            <View style={MenuStyle.infoContainer}>
              <Text style={[MenuStyle.infoText, { color: textColor }]}>
                GPA: {courseDataArrayNumber ? 3.0 : 0}
              </Text>
              <Text style={[MenuStyle.infoText, { color: textColor }]}>
                Total WGPA: {/* Replace with your WGPA value */}
              </Text>
            </View>
          </View>
          <MenuHeaderActionButtons
            onEditCourseYear={toggleModal}
            onCreateCourse={toggleModal}
            setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
            styles={styles}
            courseYear={courseYear}
          />
        </View>
      </View>
      <DeleteConfirmationModal
        showDeleteConfirmationModal={showDeleteConfirmationModal}
        setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
        handleDeleteCourse={handleDeleteCourse}
        courseYear={courseYear}
      />
    </TouchableOpacity>
  );
};
export default MenuHeader;
