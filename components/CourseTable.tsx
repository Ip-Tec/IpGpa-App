// file: @/components/CourseTable.tsx
import React from "react";
import { View, Text } from "react-native";
import Collapsible from "react-native-collapsible";
import { MenuStyle } from "@/components/CSSStyle";
import { CourseProps } from "@/type/interface";
import { CGPA, GradePoint, ScoreWGP } from "@/constants/Calculate";

interface CourseTableProps {
  courseData: CourseProps[];
  totalGPA: number;
  isCollapsed: boolean;
  getCourseYear: string;
  getBorderColor: (gpa: number) => string;
}

const CourseTable: React.FC<CourseTableProps> = ({
  courseData,
  totalGPA,
  isCollapsed,
  getBorderColor,
}) => {
  // console.log("courseData:", courseData);

  return (
    <Collapsible
      collapsed={isCollapsed}
      style={{
        width: "100%",
        height: "auto",
        backgroundColor: getBorderColor(totalGPA),
      }}
    >
      <View style={MenuStyle.collapsibleContent}>
        {/* Table Header */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            borderBottomWidth: 2,
            borderBottomColor: "black",
            backgroundColor: getBorderColor(totalGPA),
          }}
        >
          <View style={[MenuStyle.tableHeader]}>
            <Text style={[MenuStyle.tableText]}>Code</Text>
          </View>
          <View style={[MenuStyle.tableHeader]}>
            <Text style={[MenuStyle.tableText]}>Unit</Text>
          </View>
          <View style={[MenuStyle.tableHeader]}>
            <Text style={[MenuStyle.tableText]}>Score</Text>
          </View>
          <View style={[MenuStyle.tableHeader]}>
            <Text style={[MenuStyle.tableText]}>Grade</Text>
          </View>
          <View style={[MenuStyle.tableHeader]}>
            <Text style={[MenuStyle.tableText]}>WGPA</Text>
          </View>
        </View>

        {/* Table Data */}
        {courseData.map((course, index) => (
          <View key={index} style={MenuStyle.tableData}>
            <View style={[MenuStyle.tableDataRow]}>
              <Text style={MenuStyle.tableDataText}>{course.CourseCode}</Text>
            </View>
            <View style={[MenuStyle.tableDataRow]}>
              <Text style={MenuStyle.tableDataText}>
                {course.CourseUnit ?? 0}
              </Text>
            </View>
            <View style={[MenuStyle.tableDataRow]}>
              <Text style={MenuStyle.tableDataText}>{course.CourseScore}</Text>
            </View>
            <View style={[MenuStyle.tableDataRow]}>
              <Text style={MenuStyle.tableDataText}>
                {GradePoint(course.CourseScore || 0)}
              </Text>
            </View>
            <View style={[MenuStyle.tableDataRow]}>
              <Text style={MenuStyle.tableDataText}>
                {ScoreWGP(course?.CourseScore || 0, course.CourseUnit || 0)}
              </Text>
            </View>
          </View>
        ))}

        {/* Total Unit */}
        <View style={{ flexDirection: "row", width: "80%" }}>
          <View style={{ flex: 1, width: "55%" }}>
            <Text style={{ fontWeight: "bold" }}>
              Total Unit: {""}
              {courseData.reduce(
                (total, course) => total + (course.CourseUnit || 0),
                0
              )}
            </Text>
          </View>

          {/* Total Point */}
          <View style={{ flex: 1, width: "25%" }}>
            <Text style={{ fontWeight: "bold" }}>
              Total Point: {""}
              {courseData.reduce((total, course) => {
                const wgpa = course
                  ? ScoreWGP(course.CourseScore || 0, course.CourseUnit || 0)
                  : 0;
                return total + (wgpa || 0);
              }, 0)}
            </Text>
          </View>
        </View>

        {/* Total Point, Total Unit, and GPA */}
        <View
          style={{ width: "80%", flexDirection: "row", paddingVertical: 8 }}
        >
          <View style={{ flex: 1, width: "20%" }}>
            {/* Calculate the GPA */}
            <Text style={{ fontWeight: "bold" }}>
              GPA: {""}
              {(
                courseData.reduce((total, course) => {
                  const wgpa = ScoreWGP(
                    course?.CourseScore || 0,
                    course.CourseUnit || 0
                  );
                  return total + (wgpa || 0);
                }, 0) /
                courseData.reduce(
                  (total, course) => total + (course.CourseUnit || 0),
                  0
                )
              ).toFixed(2)}
            </Text>
          </View>
          <View style={{ flex: 1, width: "20%" }}>
            <Text style={{ fontWeight: "bold" }}>
              CGPA: {""}
              {/* {CGPA(courseData)} */}
            </Text>
          </View>
        </View>
      </View>
    </Collapsible>
  );
};

export default CourseTable;
