// util/Calculator.ts

import { NewCourse, Year, Course } from "@/type/interface";

enum Grade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

enum Point {
  A = 5,
  B = 4,
  C = 3,
  D = 2,
  E = 1,
  F = 0,
}

/**
 * Converts a numeric score to its corresponding grade.
 *
 * @param {number} numericScore - The numeric score to convert.
 * @return {Grade | ""} The corresponding grade or an empty string if the score is invalid.
 */
export const GradePoint = (numericScore: number): Grade | "" => {
  if (numericScore >= 0 && numericScore < 39.99) return Grade.F;
  if (numericScore >= 40 && numericScore < 44.99) return Grade.E;
  else if (numericScore >= 45 && numericScore < 49.99) return Grade.D;
  else if (numericScore >= 50 && numericScore < 59.99) return Grade.C;
  else if (numericScore >= 60 && numericScore < 69.99) return Grade.B;
  else if (numericScore >= 70 && numericScore <= 100) return Grade.A;
  else return "";
};

/**
 * Converts a numeric score to its corresponding grade point.
 *
 * @param {number} numericScore - The numeric score to convert.
 * @return {Point | undefined} The corresponding grade point, or undefined if the score is invalid.
 */
export const ScorePoint = (numericScore: number): Point | undefined => {
  if (numericScore >= 0 && numericScore < 39.99) return Point.F;
  if (numericScore >= 40 && numericScore < 44.99) return Point.E;
  else if (numericScore >= 45 && numericScore < 49.99) return Point.D;
  else if (numericScore >= 50 && numericScore < 59.99) return Point.C;
  else if (numericScore >= 60 && numericScore < 69.99) return Point.B;
  else if (numericScore >= 70 && numericScore <= 100) return Point.A;
  else return undefined;
};

export const ScoreWGP = (
  numericScore: number,
  unit: number
): number | undefined => {
  const point = ScorePoint(numericScore);

  if (point === undefined) {
    return undefined; // or handle the case when the point is not valid
  }
  // console.log({point});

  const score = unit * point;
  // console.log({score});
  return score;
};

// Function to calculate totalUnit for a given year
export const TotalUnit = (year: Year): number => {
  return year.courses.reduce((acc, course) => acc + (course.unit || 0), 0);
};

// Function to calculate totalWGP for a given year
export const TotalWGP = (year: Year): number => {
  return year.courses.reduce((acc, course) => {
    // Assuming WGP is a number
    return acc + (typeof course.WGP === "number" ? course.WGP : 0);
  }, 0);
};

// Function to calculate GPA for a given year
export const GPA = (year: Year): number | undefined => {
  const totalUnit = TotalUnit(year);
  const totalWGP = TotalWGP(year);

  if (totalUnit === 0) {
    return undefined; // Avoid division by zero
  }

  const gpa = totalWGP / totalUnit;
  return parseFloat(gpa.toFixed(3));
};

// Function to calculate CGPA for the entire course
export const CGPA = (newCourse: NewCourse): number | undefined => {
  const totalGPA = newCourse.years.reduce((acc, year) => {
    const yearGPA = GPA(year) || 0;
    console.log({ acc });
    console.log({ yearGPA });

    return acc + yearGPA;
  }, 0);

  if (newCourse.years.length === 0) {
    return undefined; // Avoid division by zero
  }

  const cgpa = totalGPA / newCourse.years.length;
  return parseFloat(cgpa.toFixed(3));
};
