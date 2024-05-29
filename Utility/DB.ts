// File: "@/Utility/DB.ts"
import * as SQLite from "expo-sqlite";
import { useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";

export const dbName = "IpGpaDB.db";

/**
 * Opens a database connection and returns a promise that resolves to a SQLiteDatabase object.
 *
 * @return {Promise<SQLiteDatabase>} A promise that resolves to a SQLiteDatabase object representing the opened database connection.
 * @throws {Error} If there is an error opening the database connection.
 */
export const openDatabaseConnection = () => {
  console.log("Attempting to open database connection...");
  try {
    const db = SQLite.openDatabaseAsync(dbName);
    console.log("Database connection established successfully");
    return db;
  } catch (error) {
    console.error("Error opening database connection:", error);
    throw error;
  }
};

// export async function migrateDbIfNeeded(db: SQLiteDatabase) {
//   const DATABASE_VERSION = 0;
//   // SQLite.deleteDatabaseAsync(dbName);
//   // console.log(SQLite.SQLiteDatabase.name);
//   let user_version = await db.getFirstAsync<{ user_version: number }>(
//     "PRAGMA user_version"
//   );

//   let currentDbVersion = user_version?.user_version ?? 0;
//   if (currentDbVersion >= DATABASE_VERSION) {
//     return;
//   }

//   if (currentDbVersion === 0) {
//     const result = await db.execAsync(`
//     PRAGMA journal_mode = 'wal';
//       CREATE TABLE Students (
//         StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
//         Email VARCHAR(100) NOT NULL
//     );

//     CREATE TABLE Courses (
//       CourseID INTEGER  PRIMARY KEY AUTOINCREMENT,
//       CourseCode VARCHAR(10) NOT NULL,
//       CourseUnit INT NOT NULL,
//       CourseScore DECIMAL(5,2) NULL,
//       CourseYear VARCHAR(100) NOT NULL
//     );

//     CREATE TABLE Enrollments (
//       EnrollmentID INTEGER PRIMARY KEY AUTOINCREMENT,
//       StudentID INTEGER NOT NULL,
//       CourseID INTEGER NOT NULL,
//       CourseScore DECIMAL(5,2) NULL,
//       Point DECIMAL(2,1) NULL,
//       Grade VARCHAR(2) NULL,
//       WGPA DECIMAL(6,2) NULL,
//       FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
//       FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
//   );

// `);
//     console.log({ result });

//     currentDbVersion = 1;
//   }
//   if (currentDbVersion == 1 || currentDbVersion > 1) {
//     await db.execAsync(`
//       ALTER TABLE Courses ADD COLUMN CourseScore DECIMAL(5,2) NULL;
//     `);

//   // SQLite.deleteDatabaseAsync(dbName);
//     currentDbVersion = 2;
//   }
//   // if (currentDbVersion === 1) {
//   //   Add more migrations
//   // }
//   await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
// }

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  // Check the current database version
  let user_version = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = user_version?.user_version ?? 0;

  // If the current version is greater than or equal to the target version, no migration is needed
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  // // Truncate the database
  // await truncateDatabase(db);

  // Create the initial database schema
  await createInitialSchema(db);

  // Update the database version
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

async function truncateDatabase(db: SQLiteDatabase) {
  try {
    // Delete the existing database file
    await SQLite.deleteDatabaseAsync(dbName);
    console.log("Database truncated successfully");
  } catch (error) {
    console.error("Error truncating database:", error);
    throw error;
  }
}

async function createInitialSchema(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE Students (
        StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
        Email VARCHAR(100) NOT NULL
      );

      CREATE TABLE Courses (
        CourseID INTEGER PRIMARY KEY AUTOINCREMENT,
        CourseCode VARCHAR(10) NOT NULL,
        CourseUnit INT NOT NULL,
        CourseScore DECIMAL(5,2) NULL,
        CourseYear VARCHAR(100) NOT NULL
      );

      CREATE TABLE Enrollments (
        EnrollmentID INTEGER PRIMARY KEY AUTOINCREMENT,
        StudentID INTEGER NOT NULL,
        CourseID INTEGER NOT NULL,
        CourseScore DECIMAL(5,2) NULL,
        Point DECIMAL(2,1) NULL,
        Grade VARCHAR(2) NULL,
        WGPA DECIMAL(6,2) NULL,
        FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
        FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
      );
    `);
    console.log("Initial schema created successfully");
  } catch (error) {
    console.error("Error creating initial schema:", error);
    throw error;
  }
}
