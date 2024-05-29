// files: @/components/EditCourseModal.tsx
import React from "react";
import { Modal, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { ModalStyle } from "@/components/CSSStyle";
import { CourseProps } from "@/type/interface";

interface EditCourseModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  courseData: { [key: string]: CourseProps[] };
  handleCourseDataChange: (index: number, field: string, value: string) => void;
  handleSave: () => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isModalVisible,
  toggleModal,
  courseData,
  handleCourseDataChange,
  handleSave,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}
      style={ModalStyle.modal}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <ScrollView style={[{ flex: 1, padding: 20, width: "100%" }]}>
          <View
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={[
                ModalStyle.text,
                { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
              ]}
            >
              Edit Course
            </Text>
            <View
              style={[
                ModalStyle.view,
                {
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingVertical: 8,
                },
              ]}
            >
              <View style={ModalStyle.view}>
                <Text style={ModalStyle.text}>Code</Text>
              </View>
              <View style={ModalStyle.view}>
                <Text style={ModalStyle.text}>Unit</Text>
              </View>
              <View style={ModalStyle.view}>
                <Text style={ModalStyle.text}>Score</Text>
              </View>
            </View>
            {Object.values(courseData).flatMap((courses, yearIndex) =>
              courses.map((course, courseIndex) => (
                <View
                  key={`${yearIndex}-${courseIndex}`}
                  style={[
                    ModalStyle.view,
                    {
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: "#ccc",
                      paddingVertical: 8,
                    },
                  ]}
                >
                  <View style={ModalStyle.view}>
                    <TextInput
                      value={course.CourseCode}
                      onChangeText={(text) =>
                        handleCourseDataChange(
                          yearIndex * courses.length + courseIndex,
                          "CourseCode",
                          text
                        )
                      }
                      style={{ textAlign: "center" }}
                    />
                  </View>
                  <View style={ModalStyle.view}>
                    <TextInput
                      value={course.CourseUnit?.toString() ?? ""}
                      onChangeText={(text) =>
                        handleCourseDataChange(
                          yearIndex * courses.length + courseIndex,
                          "CourseUnit",
                          text
                        )
                      }
                      keyboardType="numeric"
                      style={{ textAlign: "center" }}
                    />
                  </View>
                  <View style={ModalStyle.view}>
                    <TextInput
                      value={course.CourseScore?.toString() ?? ""}
                      onChangeText={(text) =>
                        handleCourseDataChange(
                          yearIndex * courses.length + courseIndex,
                          "CourseScore",
                          text
                        )
                      }
                      keyboardType="numeric"
                      style={{ textAlign: "center" }}
                    />
                  </View>
                </View>
              ))
            )}

            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#007bff",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
                onPress={handleSave}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#dc3545",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
                onPress={toggleModal}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditCourseModal;
