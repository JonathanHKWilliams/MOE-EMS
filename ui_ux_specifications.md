# LNEMIS UI/UX Design Specifications

## Design System

### 1. Brand Identity

#### 1.1 Color Palette
- **Primary Colors**
  - Primary Blue: `#003875` (Liberian Flag Blue)
  - Secondary Red: `#C8102E` (Liberian Flag Red)
  - White: `#FFFFFF`

- **Secondary Colors**
  - Success Green: `#28A745`
  - Warning Yellow: `#FFC107`
  - Error Red: `#DC3545`
  - Info Blue: `#17A2B8`

- **Neutral Colors**
  - Dark Gray: `#343A40`
  - Medium Gray: `#6C757D`
  - Light Gray: `#F8F9FA`

#### 1.2 Typography
- **Primary Font**: Roboto
- **Secondary Font**: Open Sans
- **Heading Sizes**
  - H1: 32px/40px
  - H2: 24px/32px
  - H3: 20px/28px
  - H4: 18px/24px
  - Body: 16px/24px
  - Small: 14px/20px

#### 1.3 Spacing System
- Base unit: 8px
- Spacing scale: 8, 16, 24, 32, 48, 64, 96

### 2. Component Library

#### 2.1 Common Components
- Buttons (Primary, Secondary, Tertiary)
- Input fields
- Dropdown menus
- Data tables
- Cards
- Navigation bars
- Modals
- Alerts
- Progress indicators
- Charts and graphs

## Portal Designs

### 1. Minister/Super Admin Dashboard

#### 1.1 Layout
```plaintext
+------------------+--------------------------------+
|    Ministry      |     Main Content Area          |
|     Logo         |     Dashboard Overview         |
|                  |                                |
|  Navigation      |     Quick Stats                |
|   - Overview     |     +--------+ +--------+      |
|   - Counties     |     |        | |        |      |
|   - Reports      |     |        | |        |      |
|   - Settings     |     +--------+ +--------+      |
|                  |                                |
|  Quick Access    |     Recent Activities          |
|   - Alerts       |     +-------------------+      |
|   - Messages     |     |                   |      |
|                  |     |                   |      |
+------------------+--------------------------------+
```

#### 1.2 Key Features
- National statistics overview
- County comparison charts
- Resource allocation maps
- Alert management system
- Performance metrics dashboard

### 2. County Education Officer Portal

#### 2.1 Layout
```plaintext
+------------------+--------------------------------+
|    County        |     County Dashboard           |
|    Seal          |                                |
|                  |     District Overview          |
|  Navigation      |     +-------------------+      |
|   - Districts    |     |    Map View      |      |
|   - Schools      |     |                  |      |
|   - Staff        |     +-------------------+      |
|   - Reports      |                                |
|                  |     Performance Metrics        |
|  Quick Links     |     +--------+ +--------+      |
|   - Forms        |     |        | |        |      |
|   - Guidelines   |     |        | |        |      |
|                  |     +--------+ +--------+      |
+------------------+--------------------------------+
```

### 3. School Administrator Portal

#### 3.1 Layout
```plaintext
+------------------+--------------------------------+
|    School        |     School Dashboard           |
|    Logo          |                                |
|                  |     Class Overview             |
|  Navigation      |     +-------------------+      |
|   - Students     |     |   Grid View      |      |
|   - Teachers     |     |                  |      |
|   - Classes      |     +-------------------+      |
|   - Reports      |                                |
|                  |     Daily Statistics           |
|  Quick Actions   |     +--------+ +--------+      |
|   - Attendance   |     |        | |        |      |
|   - Grades       |     |        | |        |      |
|                  |     +--------+ +--------+      |
+------------------+--------------------------------+
```

### 4. Teacher Portal

#### 4.1 Layout
```plaintext
+------------------+--------------------------------+
|    Teacher       |     Class Dashboard            |
|    Profile       |                                |
|                  |     Student List               |
|  Navigation      |     +-------------------+      |
|   - Classes      |     |   List View      |      |
|   - Attendance   |     |                  |      |
|   - Grades       |     +-------------------+      |
|   - Resources    |                                |
|                  |     Course Materials           |
|  Quick Actions   |     +--------+ +--------+      |
|   - Take         |     |        | |        |      |
|     Attendance   |     |        | |        |      |
|                  |     +--------+ +--------+      |
+------------------+--------------------------------+
```

### 5. Student/Parent Portal

#### 5.1 Layout
```plaintext
+------------------+--------------------------------+
|    Student       |     Academic Dashboard         |
|    Profile       |                                |
|                  |     Course Overview            |
|  Navigation      |     +-------------------+      |
|   - Courses      |     |   Card View      |      |
|   - Grades       |     |                  |      |
|   - Schedule     |     +-------------------+      |
|   - Resources    |                                |
|                  |     Upcoming Events            |
|  Quick Links     |     +--------+ +--------+      |
|   - Calendar     |     |        | |        |      |
|   - Messages     |     |        | |        |      |
|                  |     +--------+ +--------+      |
+------------------+--------------------------------+
```

## Responsive Design

### 1. Breakpoints
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large Desktop: 1025px+

### 2. Mobile Considerations
- Collapsible navigation menu
- Simplified data views
- Touch-friendly interface
- Offline capabilities

## Accessibility Guidelines

### 1. WCAG 2.1 Compliance
- Minimum contrast ratio: 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- Alternative text for images
- Focus indicators

### 2. User Assistance
- Contextual help
- Tool tips
- Error prevention
- Clear feedback messages

## Interactive Elements

### 1. Data Visualization
- Interactive maps
- Dynamic charts
- Real-time updates
- Filterable tables

### 2. Forms
- Input validation
- Auto-save functionality
- Progress indicators
- Smart defaults
