// files: @/screens/TabOneScreen.tsx
import Menu from "@/components/Menu";
import { ActivityIndicator, Animated } from "react-native";
import { Index } from "@/components/CSSStyle";
import { useSQLiteContext } from "expo-sqlite";
import { ScoreWGP } from "@/constants/Calculate";
import React, { useState, useEffect } from "react";
import { EmptyState } from "@/components/EmptyState";
import { ScrollView, View } from "@/components/Themed";
import CourseInputForm from "@/components/CourseInputForm";
import { createCourse, getAllCourses } from "@/constants/Crud";

export default function TabOneScreen() {
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseUnit, setCourseUnit] = useState<number>(0);
  const [courseScore, setCourseScore] = useState<number | null>(0);
  const [courseYear, setCourseYear] = useState<string>("");
  const [ScoreWGPValue, setScoreWGPValue] = useState<number | undefined>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [scaleValue] = useState(new Animated.Value(1));
  const [totalCourseUnit, setTotalCourseUnit] = useState<number>(0);
  const [totalGPA, setTotalGPA] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [courseDatas, setCourseDatas] = useState();
  let SWGP: number | undefined;

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  useEffect(() => {
    getAllEntries();
  }, []);

  const getAllEntries = async () => {
    try {
      const allCourses: any = await getAllCourses();
      setTotalCourses(allCourses.length);
      setCourseDatas(allCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const DB = useSQLiteContext();

  const handleSubmit = async () => {
    // Clear previous errors
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!courseYear) {
      newErrors.courseYear = "Course year is required";
    }
    if (!courseCode) {
      newErrors.courseCode = "Course code is required";
    }
    if (!courseUnit) {
      newErrors.courseUnit = "Course unit/weight is required";
    }
    if (!courseScore) {
      newErrors.courseScore = "Course score is required";
    }

    // Set errors if there are any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // console.log({ newErrors });

      return;
    }

    const SWGP =
      courseScore && courseUnit ? ScoreWGP(courseScore, courseUnit) : undefined;
    setScoreWGPValue(SWGP);

    // Calculate totals
    try {
      // Ensure that the table exists in the database

      // Insert the record into the database
      await createCourse(
        DB,
        courseCode,
        courseUnit,
        courseScore || 0,
        courseYear
      );

      // Clear input fields after successful submission
      setCourseCode("");
      setCourseUnit(0);
      setCourseScore(0);
      setCourseYear("");

      // Update total course unit, GPA, and total courses
      setTotalCourseUnit((prevTotal) => prevTotal + courseUnit);
      setTotalGPA(
        (prevGPA) => (prevGPA * totalCourses + (SWGP || 0)) / (totalCourses + 1)
      );
      setTotalCourses((prevTotal) => prevTotal + 1);

      // Optional: Provide feedback to the user
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optional: Handle error and provide feedback to the user
    }
  };

  /**
   * Executes an animation on the `scaleValue` property when the component is pressed in.
   *
   * @return {void} This function does not return anything.
   */
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
      onScroll={({ nativeEvent }) => {
        const { contentOffset } = nativeEvent;
        if (contentOffset.y < 0) {
          getAllEntries();
        }
      }}
    >
      <View style={Index.container}>
        {totalCourses > 0 ? (
          <Menu toggleInputs={toggleInputs} onPressIn={onPressIn} onPressOut={onPressOut} />
        ) : (
          <EmptyState
            toggleInputs={toggleInputs}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          />
        )}
        {showInputs && (
          <CourseInputForm
            showInputs={showInputs}
            courseYear={courseYear}
            courseCode={courseCode}
            courseUnit={courseUnit}
            courseScore={courseScore || 0}
            errors={errors}
            scaleValue={scaleValue}
            setCourseYear={setCourseYear}
            setCourseCode={setCourseCode}
            setCourseUnit={setCourseUnit}
            setCourseScore={setCourseScore}
            handleSubmit={handleSubmit}
            toggleInputs={toggleInputs}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          />
        )}
      </View>
    </ScrollView>
  );
}
