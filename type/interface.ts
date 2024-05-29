// type/index.ts

import { ViewStyle } from "react-native";

export interface CourseProps {
  CourseCode: string | undefined;
  CourseScore: number | undefined;
  CourseUnit: number | undefined;
  CourseGrade?: string | undefined;
  CourseIndex?: number | undefined;
  
  CourseYear?: string;
  Point?: number | undefined;
  WGP?: number | string;
}
export interface DialogProps {
  DialogState: boolean;
  onClose: () => void;
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
}

export type Course = {
  code: string | undefined;
  score: number | undefined;
  unit: number | undefined;
  Point: number | undefined;
  Grade: string | undefined;
  WGP: number | string;
};

export interface Year {
  year: number;
  courses: Course[];
  totalUnit?: number;
  totalWGP?: number;
  GPA?: string | number;
  CGPA?: string | number;
}

export type NewCourse = {
  years: Year[];
};

export interface IconProps {
  width: string | number | null;
  height: string | number | null;
}
export interface MessageProps {
  msg: string | number | null;
  props?: string | number | null;
}

export interface Error {
  courseCode?: string;
  courseUnit?: string;
  courseScore?: string;
  courseYear?: string;
}

export interface CourseYear {
  courseYear: string;
}

export interface EmptyStateProps {
  toggleInputs: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  style?: ViewStyle;
}