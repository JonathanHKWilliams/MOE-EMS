# LNEMIS API Documentation

## API Overview
Base URL: `https://api.lnemis.gov.lr/v1`

## Authentication
All API endpoints require authentication using JWT (JSON Web Tokens).
- Token Header: `Authorization: Bearer <token>`
- Token Expiry: 24 hours
- Refresh Token Validity: 30 days

## API Endpoints

### Authentication Endpoints

```plaintext
POST /auth/login
POST /auth/refresh-token
POST /auth/logout
POST /auth/reset-password
```

### User Management

```plaintext
GET    /users
POST   /users
GET    /users/{userId}
PUT    /users/{userId}
DELETE /users/{userId}
GET    /users/{userId}/roles
POST   /users/{userId}/roles
```

### Institution Management

```plaintext
GET    /institutions
POST   /institutions
GET    /institutions/{institutionId}
PUT    /institutions/{institutionId}
DELETE /institutions/{institutionId}
GET    /institutions/{institutionId}/statistics
GET    /institutions/{institutionId}/staff
GET    /institutions/{institutionId}/students
```

### Geographic Data

```plaintext
GET    /regions
GET    /regions/{regionId}/counties
GET    /counties
GET    /counties/{countyId}
GET    /counties/{countyId}/districts
GET    /counties/{countyId}/statistics
GET    /districts
GET    /districts/{districtId}
GET    /districts/{districtId}/schools
```

### Student Management

```plaintext
GET    /students
POST   /students
GET    /students/{studentId}
PUT    /students/{studentId}
DELETE /students/{studentId}
GET    /students/{studentId}/academic-records
POST   /students/{studentId}/academic-records
GET    /students/{studentId}/attendance
```

### Staff Management

```plaintext
GET    /staff
POST   /staff
GET    /staff/{staffId}
PUT    /staff/{staffId}
DELETE /staff/{staffId}
GET    /staff/{staffId}/certifications
POST   /staff/{staffId}/certifications
```

### Analytics and Reporting

```plaintext
GET    /analytics/enrollment
GET    /analytics/attendance
GET    /analytics/performance
GET    /analytics/demographics
GET    /reports/county/{countyId}
GET    /reports/district/{districtId}
GET    /reports/institution/{institutionId}
```

### LMS Endpoints

```plaintext
GET    /courses
POST   /courses
GET    /courses/{courseId}
PUT    /courses/{courseId}
DELETE /courses/{courseId}
GET    /courses/{courseId}/students
POST   /courses/{courseId}/students
DELETE /courses/{courseId}/students/{studentId}
```

## Detailed Endpoint Specifications

### User Registration (POST /users)

Request Body:
```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "roleId": "integer",
    "institutionId": "integer",
    "phoneNumber": "string"
}
```

Response (200 OK):
```json
{
    "userId": "integer",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": {
        "roleId": "integer",
        "name": "string"
    },
    "createdAt": "datetime"
}
```

### Get County Statistics (GET /counties/{countyId}/statistics)

Response (200 OK):
```json
{
    "countyId": "integer",
    "name": "string",
    "statistics": {
        "totalStudents": "integer",
        "totalTeachers": "integer",
        "totalSchools": "integer",
        "enrollmentRate": "float",
        "dropoutRate": "float",
        "graduationRate": "float",
        "genderDistribution": {
            "male": "float",
            "female": "float"
        },
        "educationLevels": {
            "primary": "integer",
            "secondary": "integer",
            "tertiary": "integer"
        }
    },
    "lastUpdated": "datetime"
}
```

## Error Handling

All endpoints follow standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error Response Format:
```json
{
    "error": {
        "code": "string",
        "message": "string",
        "details": "object (optional)"
    }
}
```

## Rate Limiting

- Standard Rate: 100 requests per minute
- Bulk Operations: 20 requests per minute
- Analytics Endpoints: 30 requests per minute
