// files: @/constants/Crud.tsx

import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";
// Open the database connection
const db = SQLite.openDatabaseSync("IpGpaDB.db");

// Create a new student
export const createStudent = async (
  email: string,
  intValue: number
): Promise<void> => {
  const statement = await db.prepareAsync(
    "INSERT INTO Students (Email, intValue) VALUES ($email, $intValue)"
  );
  try {
    let result = await statement.executeAsync({
      $email: email,
      $intValue: intValue,
    });
    // console.log(
    //   "Student created successfully:",
    //   result.lastInsertRowId,
    //   result.changes
    // );
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Read all students
export const getAllStudents = async (
  minIntValue: number
): Promise<{ id: number; Email: string; intValue: number }[]> => {
  const statement = await db.prepareAsync(
    "SELECT * FROM Students WHERE intValue >= $intValue"
  );
  try {
    const result = await statement.executeAsync<{
      id: number;
      Email: string;
      intValue: number;
    }>({
      $intValue: minIntValue,
    });

    const allRows = await result.getAllAsync();
    return allRows;
  } catch (error) {
    console.error("Error getting all students:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Update a student's email and intValue
export const updateStudent = async (
  studentId: number,
  newEmail: string,
  newIntValue: number
): Promise<void> => {
  const statement = await db.prepareAsync(
    "UPDATE Students SET Email = $newEmail, intValue = $newIntValue WHERE id = $studentId"
  );
  try {
    await statement.executeAsync({
      $newEmail: newEmail,
      $newIntValue: newIntValue,
      $studentId: studentId,
    });
    console.log("Student updated successfully");
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Update a student's email
export const updateStudentEmail = async (
  studentId: number,
  newEmail: string
): Promise<void> => {
  const statement = await db.prepareAsync(`
    UPDATE Students
    SET Email = $newEmail
    WHERE StudentID = $studentId
  `);
  try {
    await statement.executeAsync({
      $newEmail: newEmail,
      $studentId: studentId,
    });
    console.log("Student email updated successfully");
  } catch (error) {
    console.error("Error updating student email:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Delete a student
export const deleteStudent = async (studentId: number): Promise<void> => {
  const statement = await db.prepareAsync(
    "DELETE FROM Students WHERE id = $studentId"
  );
  try {
    await statement.executeAsync({ $studentId: studentId });
    console.log("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Create a new course
export const createCourse = async (
  DB: SQLiteDatabase,
  courseCode: string,
  courseUnit: number,
  courseScore: number,
  courseYear: string
): Promise<void> => {
  const statement = await DB.prepareAsync(`
    INSERT INTO Courses (CourseCode, CourseUnit, CourseYear)
    VALUES ($courseCode, $courseUnit,  $courseYear)
  `);
  try {
    await statement.executeAsync({
      $courseCode: courseCode,
      $courseUnit: courseUnit,
      $courseScore: courseScore,
      $courseYear: courseYear,
    });
    console.log("Course created successfully");
    // console.log("getAllCourses:", getAllCourses());
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Read all courses
export const getAllCourses = async (): Promise<{ db: SQLiteDatabase }[]> => {
  const statement = await db.prepareAsync(`
    SELECT * FROM Courses
  `);
  try {
    const result = await statement.executeAsync();

    const allRows: any = await result.getAllAsync();

    // for (const row of allRows) {
    //   // console.log("getAllCourses row:", row);
    //   return row;
    // }

    // Reset the SQLite query cursor to the beginning for the next `for-await-of` loop.
    await result.resetAsync();

    return allRows;
  } catch (error) {
    console.error("Error getting all courses:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Update a course
export const updateCourse = async (
  courseId: number,
  courseCode: string,
  courseUnit: number,
  courseYear: string
): Promise<void> => {
  const statement = await db.prepareAsync(`
    UPDATE Courses
    SET CourseCode = $courseCode,  CourseUnit = $courseUnit, CourseYear = $courseYear
    WHERE CourseID = $courseId
  `);
  try {
    await statement.executeAsync({
      $courseCode: courseCode,
      $courseUnit: courseUnit,
      $courseYear: courseYear,
      $courseId: courseId,
    });
    console.log("Course updated successfully");
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Delete a course
export const deleteCourse = async (courseId: number): Promise<void> => {
  const statement = await db.prepareAsync(`
    DELETE FROM Courses
    WHERE CourseID = $courseId
  `);
  try {
    await statement.executeAsync({ $courseId: courseId });
    console.log("Course deleted successfully");
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

/**
 * Deletes all courses with the specified course year.
 *
 * @param {string} courseYear - The course year to delete courses for.
 * @return {Promise<void>} A promise that resolves when the courses are deleted successfully.
 * @throws {Error} If there is an error deleting the courses.
 */
export const deleteCoursesByYear = async (
  courseYear: string
): Promise<void> => {
  const statement = await db.prepareAsync(`
    DELETE FROM Courses
    WHERE CourseYear = 'PHY 203'
  `);

  try {
    const result = await statement.executeAsync({ $courseYear: courseYear });
    // The number of rows affected by the statement.
    // console.log(result.changes);

    // console.log(`Courses year named ${courseYear} was deleted successfully`);
    return `Courses year named ${courseYear} was deleted successfully`;
  } catch (error) {
    console.error(`Error deleting courses with year ${courseYear}:`, error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Create a new enrollment
export const createEnrollment = async (
  studentId: number,
  courseId: number,
  courseScore: number | null,
  point: number | null,
  grade: string | null,
  wgpa: number | null
): Promise<void> => {
  const statement = await db.prepareAsync(`
    INSERT INTO Enrollments (StudentID, CourseID, CourseScore, Point, Grade, WGPA)
    VALUES ($studentId, $courseId, $courseScore, $point, $grade, $wgpa)
  `);
  try {
    await statement.executeAsync({
      $studentId: studentId,
      $courseId: courseId,
      $courseScore: courseScore,
      $point: point,
      $grade: grade,
      $wgpa: wgpa,
    });
    console.log("Enrollment created successfully");
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Read all enrollments
export const getAllEnrollments = async (): Promise<
  {
    EnrollmentID: number;
    StudentID: number;
    CourseID: number;
    CourseScore: number | null;
    Point: number | null;
    Grade: string | null;
    WGPA: number | null;
  }[]
> => {
  const statement = await db.prepareAsync(`
    SELECT * FROM Enrollments
  `);
  try {
    const { rows } = await statement.queryAsync<{
      EnrollmentID: number;
      StudentID: number;
      CourseID: number;
      CourseScore: number | null;
      Point: number | null;
      Grade: string | null;
      WGPA: number | null;
    }>();
    return rows._array;
  } catch (error) {
    console.error("Error getting all enrollments:", error);
    throw error;
  } finally {
    await statement.finalizeAsync();
  }
};

// Update an enrollment
