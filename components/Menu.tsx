import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { CourseProps } from "@/type/interface";
import { ScoreWGP } from "@/constants/Calculate";
import { getAllCourses } from "@/constants/Crud";
import MenuHeader from "@/components/MenuHeader";
import CourseTable from "@/components/CourseTable";
import EditCourseModal from "@/components/EditCourseModal";
import { CourseYear, EmptyStateProps } from "@/type/interface";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Menu: React.FC<EmptyStateProps> = (
  { toggleInputs, onPressIn, onPressOut },
  props?
) => {
  const [isCollapsed, setIsCollapsed] = useState<Map<string, boolean>>(
    new Map()
  );
  const [courseData, setCourseData] = useState<{
    [key: string]: CourseProps[];
  }>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#000";

  useEffect(() => {
    getAllEntries();
  }, []);

  const getAllEntries = async () => {
    try {
      const allCourses: any = await getAllCourses();
      const groupedData = groupByCourseYear(allCourses);
      setCourseData(groupedData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const groupByCourseYear = (data: CourseProps[]) => {
    return data.reduce((acc: { [key: string]: CourseProps[] }, current) => {
      const courseYear = current.CourseYear?.trim();
      if (courseYear) {
        if (!acc[courseYear]) {
          acc[courseYear] = [];
        }
        acc[courseYear].push(current);
      }
      return acc;
    }, {});
  };

  const getTotalCourseUnit = (courses: CourseProps[]) => {
    return courses.reduce(
      (total, course) => total + (course.CourseUnit || 0),
      0
    );
  };

  const getTotalCourses = (courses: CourseProps[]) => {
    return courses.length;
  };

  const getTotalWGPA = (courses: CourseProps[]) => {
    const totalWGP = courses.reduce((total, course) => {
      const wgp = ScoreWGP(course.CourseScore || 0, course.CourseUnit || 0);
      return total + (wgp || 0);
    }, 0);
    const totalUnit = getTotalCourseUnit(courses);
    return totalWGP / totalUnit;
  };

  const toggleCollapse = (courseYear: string) => {
    setIsCollapsed((prevIsCollapsed) => {
      const newIsCollapsed = new Map(prevIsCollapsed);
      newIsCollapsed.set(courseYear, !newIsCollapsed.get(courseYear));
      return newIsCollapsed;
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getBorderColor = (gpa: number) => {
    if (gpa >= 3.5) return "#4caf50";
    if (gpa >= 3.0) return "#ffeb3b";
    if (gpa >= 2.5) return "#03a9f4";
    return "#f44336";
  };

  const handleSave = () => {
    setCourseData((prevCourseData) => {
      const updatedCourseData = { ...prevCourseData };
      Object.entries(updatedCourseData).forEach(([courseYear, courses]) => {
        updatedCourseData[courseYear] = courses.map((course) => ({
          ...course,
          CourseCode: course.CourseCode,
          CourseUnit: course.CourseUnit,
          CourseScore: course.CourseScore,
        }));
      });
      return updatedCourseData;
    });
    toggleModal();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
      }}
    >
      {courseData &&
        Object.entries(courseData).map(([courseYear, courses]) => (
          <View
            key={courseYear}
            style={{
              width: "100%",
              borderWidth: 1,
              borderRadius: 10,
              paddingRight: 19,
              marginBottom: 10,
              borderColor: "#ddd",
            }}
          >
            <MenuHeader
              totalCourseUnit={getTotalCourseUnit(courses)}
              totalCourses={getTotalCourses(courses)}
              totalGPA={getTotalWGPA(courses)}
              textColor={textColor}
              toggleCollapse={() => toggleCollapse(courseYear)}
              toggleModal={toggleModal}
              courseYear={courseYear}
              courseDataArrayNumber={courses.length}
            />
            <CourseTable
              courseData={courses}
              totalGPA={getTotalWGPA(courses)}
              isCollapsed={isCollapsed.get(courseYear) ?? true}
              getCourseYear={courseYear}
              getBorderColor={getBorderColor}
            />
          </View>
        ))}
      <EditCourseModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        courseData={courseData}
        handleCourseDataChange={(index, field, value) => {
          setCourseData((prevCourseData) => {
            const updatedCourseData = { ...prevCourseData };
            if (prevCourseData) {
              Object.entries(prevCourseData).forEach(
                ([courseYear, courses]) => {
                  if (courses[index]) {
                    updatedCourseData[courseYear][index] = {
                      ...courses[index],
                      [field]:
                        field === "CourseUnit" || field === "CourseScore"
                          ? parseInt(value, 10)
                          : value,
                    };
                  }
                }
              );
            }
            return updatedCourseData;
          });
        }}
        handleSave={handleSave}
      />
      <View style={{ height: 60 }}></View>
      <View
        style={{
          bottom: 0,
          height: 80,
          width: "100%",
          position: "absolute",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            top: -10,
            zIndex: 1,
            borderRadius: 25,
            position: "absolute",
            backgroundColor: "#03a9f4",
          }}
          onPress={toggleInputs}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <FontAwesome
            style={[
              props,
              {
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#03a9f4",
              },
            ]}
            name="plus-circle"
            size={50}
            color="white"
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, position: "absolute", bottom: 0 }}>
          Click to add more
        </Text>
      </View>
      <View>
        <ActivityIndicator size="large" color="#03a9f4" />
      </View>
    </ScrollView>
  );
};

export default Menu;
