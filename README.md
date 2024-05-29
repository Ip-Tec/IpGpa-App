# GPA Calculator

This is a GPA calculator built with React Native and SQLite. It allows users to enter course scores, units, and years, and calculates the GPA, CGPA, and WGPA for each course. The data is stored in a SQLite database.

## Features

- Enter course scores, units, and years
- Calculate GPA, CGPA, and WGPA for each course
- Save data to a SQLite database
- View all courses and their GPA, CGPA, and WGPA

## Installation

1. Clone the repository: `git clone https://github.com/Ip-Tec/IpGpa-App.git`
2. Navigate to the project directory: `cd IpGpa-App`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Usage

1. Open the project in a code editor
2. Run the development server: `npm start`
3. Open the project in an emulator or on a physical device

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thank you to the React Native and SQLite communities for their support and resources

## The Database schema for the GPA calculator:

```sql
CREATE TABLE IF NOT EXISTS Course (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseCode TEXT NOT NULL,
    courseUnit INTEGER NOT NULL,
    courseScore INTEGER,
    courseYear TEXT,
    Point REAL,
    Grade TEXT,
    WGPA REAL
);

-- Create Year table
CREATE TABLE IF NOT EXISTS Year (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    totalCourses INTEGER,
    totalUnit REAL,
    totalWGPA REAL,
    GPA REAL,
    CGPA REAL
);
```