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