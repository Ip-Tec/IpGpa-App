// files: @/components/CourseInputForm.tsx
import React from "react";
import { TextInput, TouchableOpacity, Animated, Modal } from "react-native";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Index } from "@/components/CSSStyle";
import { Error } from "@/type/interface";

interface CourseInputFormProps {
  showInputs: boolean;
  courseYear: string;
  courseCode: string;
  courseUnit: number;
  courseScore: number;
  errors: Error;
  scaleValue: Animated.Value;
  setCourseYear: (text: string) => void;
  setCourseCode: (text: string) => void;
  setCourseUnit: (num: number) => void;
  setCourseScore: (num: number | null) => void;
  handleSubmit: () => void;
  toggleInputs: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
}

const CourseInputForm: React.FC<CourseInputFormProps> = ({
  showInputs,
  courseYear,
  courseCode,
  courseUnit,
  courseScore,
  errors,
  scaleValue,
  setCourseYear,
  setCourseCode,
  setCourseUnit,
  setCourseScore,
  handleSubmit,
  toggleInputs,
  onPressIn,
  onPressOut,
}) => {
  const handleCourseScoreChange = (text: string) => {
    const numericValue = parseFloat(text);
    if (isNaN(numericValue)) {
      setCourseScore(null);
    } else {
      setCourseScore(numericValue);
    }
  };
  return (
    <Modal
      style={Index.card}
      visible={showInputs}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleInputs}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          style={{
            height: "auto",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: "auto",
            padding: 20,
            paddingTop: 10,
          }}
        >
          <View style={[Index.row, { height: 30 }]}>
            <TouchableOpacity
              style={{
                top: 0,
                right: 0,
                position: "absolute",
              }}
              onPress={toggleInputs}
            >
              <FontAwesome name="close" size={30} color={"#dc3545"} />
            </TouchableOpacity>
          </View>
          <View style={Index.row}>
            <Text style={Index.label}>Course Year/Level</Text>
            <TextInput
              style={Index.input}
              placeholder="Year/Level"
              value={courseYear}
              onChangeText={setCourseYear}
            />
            {errors.courseYear && (
              <Text style={Index.errorText}>{errors.courseYear}</Text>
            )}
          </View>
          <View style={Index.row}>
            <Text style={Index.label}>Course Code</Text>
            <TextInput
              style={Index.input}
              placeholder="Enter code"
              value={courseCode.toLocaleUpperCase()}
              onChangeText={setCourseCode}
            />
            {errors.courseCode && (
              <Text style={Index.errorText}>{errors.courseCode}</Text>
            )}
          </View>
          <View style={Index.row}>
            <Text style={Index.label}>Course Unit/Weight</Text>
            <TextInput
              style={Index.input}
              keyboardType="numeric"
              placeholder="Enter unit/weight"
              value={courseUnit ? courseUnit.toString() : ""}
              onChangeText={(text) => setCourseUnit(parseInt(text))}
            />
            {errors.courseUnit && (
              <Text style={Index.errorText}>{errors.courseUnit}</Text>
            )}
          </View>
          <View style={Index.row}>
            <Text style={Index.label}>Course Score</Text>
            <TextInput
              style={Index.input}
              placeholder="Enter score"
              value={courseScore !== null ? courseScore.toString() : ""}
              onChangeText={handleCourseScoreChange}
              keyboardType="numeric"
            />
            {errors.courseScore && (
              <Text style={Index.errorText}>{errors.courseScore}</Text>
            )}
          </View>
          <TouchableOpacity
            style={Index.submitButton}
            onPress={handleSubmit}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Animated.Text
              style={[
                Index.submitButtonText,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              Add
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CourseInputForm;
