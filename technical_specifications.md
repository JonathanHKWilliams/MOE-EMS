# LNEMIS Technical Specifications

## Database Schema Design

### Core Entities

```sql
-- Geographic Hierarchy
CREATE TABLE regions (
    region_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE counties (
    county_id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(region_id),
    name VARCHAR(100) NOT NULL,
    population INTEGER,
    geo_coordinates POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE districts (
    district_id SERIAL PRIMARY KEY,
    county_id INTEGER REFERENCES counties(county_id),
    name VARCHAR(100) NOT NULL,
    population INTEGER,
    geo_coordinates POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    district_id INTEGER REFERENCES districts(district_id),
    name VARCHAR(100) NOT NULL,
    type ENUM('TOWN', 'VILLAGE', 'CITY') NOT NULL,
    population INTEGER,
    geo_coordinates POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Educational Institutions
CREATE TABLE institution_types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,  -- University, College, High School
    description TEXT
);

CREATE TABLE institutions (
    institution_id SERIAL PRIMARY KEY,
    type_id INTEGER REFERENCES institution_types(type_id),
    location_id INTEGER REFERENCES locations(location_id),
    name VARCHAR(200) NOT NULL,
    registration_number VARCHAR(50) UNIQUE,
    established_date DATE,
    accreditation_status VARCHAR(50),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    website VARCHAR(200),
    geo_coordinates POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users and Authentication
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,  -- Minister, County Officer, District Officer, School Admin, Teacher, Parent, Student
    description TEXT,
    permissions JSONB
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(role_id),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Educational Staff
CREATE TABLE staff (
    staff_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    institution_id INTEGER REFERENCES institutions(institution_id),
    employee_id VARCHAR(50) UNIQUE,
    position VARCHAR(100),
    department VARCHAR(100),
    hire_date DATE,
    certification_status VARCHAR(50),
    education_level VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    institution_id INTEGER REFERENCES institutions(institution_id),
    enrollment_number VARCHAR(50) UNIQUE,
    current_grade VARCHAR(20),
    enrollment_date DATE,
    expected_graduation DATE,
    status ENUM('ACTIVE', 'GRADUATED', 'DROPPED', 'TRANSFERRED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic Records
CREATE TABLE academic_records (
    record_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    academic_year VARCHAR(9),
    semester VARCHAR(20),
    gpa DECIMAL(3,2),
    attendance_rate DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LMS Components
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES institutions(institution_id),
    code VARCHAR(20) NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    credits INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    course_id INTEGER REFERENCES courses(course_id),
    enrollment_date DATE,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## County Hierarchy Structure

### Administrative Levels

1. **National Level**
   - Minister of Education (Super Admin)
   - Deputy Ministers
   - National Education Officers

2. **Regional Level**
   - Regional Education Directors
   - Regional Planning Officers
   - Regional Statistics Officers

3. **County Level**
   - County Education Officers (CEOs)
   - County School Supervisors
   - County Statistics Officers
   
4. **District Level**
   - District Education Officers (DEOs)
   - District School Supervisors
   - District Data Officers

5. **Institution Level**
   - School Administrators
   - Department Heads
   - Teachers
   - Support Staff

### Data Flow Structure

```plaintext
Minister of Education
├── Regional Director (North)
│   ├── Lofa County
│   │   ├── Voinjama District
│   │   ├── Kolahun District
│   │   └── Foya District
│   ├── Gbarpolu County
│   └── Bong County
├── Regional Director (South)
│   ├── Maryland County
│   ├── River Gee County
│   └── Grand Kru County
├── Regional Director (Central)
│   ├── Montserrado County
│   ├── Margibi County
│   └── Grand Bassa County
└── Regional Director (Southeast)
    ├── Nimba County
    ├── Grand Gedeh County
    └── Sinoe County
```

### Access Control Matrix

| Role | National Data | Regional Data | County Data | District Data | School Data |
|------|---------------|---------------|-------------|---------------|-------------|
| Minister | Full Access | Full Access | Full Access | Full Access | Full Access |
| Regional Director | View All | Full Access | Full Access | Full Access | View All |
| CEO | View Summary | View Own | Full Access | Full Access | Full Access |
| DEO | No Access | No Access | View Own | Full Access | Full Access |
| School Admin | No Access | No Access | No Access | View Own | Full Access |

### Data Collection Points

1. **School Level**
   - Student enrollment
   - Teacher attendance
   - Academic performance
   - Infrastructure status

2. **District Level**
   - School inspection reports
   - Resource distribution
   - Teacher deployment

3. **County Level**
   - Budget allocation
   - Project implementation
   - Performance metrics

4. **Regional Level**
   - Policy compliance
   - Resource management
   - Development planning

5. **National Level**
   - Policy making
   - National statistics
   - Strategic planning
