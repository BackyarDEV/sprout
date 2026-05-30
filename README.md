# Sprout 🌱

A full-stack employee management application built to learn modern frontend development with React and TypeScript while leveraging Spring Boot on the backend.

## Overview

Sprout is a CRUD-based employee management system featuring:

* React + TypeScript frontend
* Spring Boot backend
* H2 database persistence
* Material UI (MUI) components
* REST API architecture
* Search, Create, Read, Update, and Delete operations

The project serves as a practical learning journey from traditional Java web development toward modern full-stack application development.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Material UI (MUI)

### Backend

* Spring Boot
* Spring Web
* Spring Data JPA
* H2 Database

### Development Tools

* IntelliJ IDEA
* Maven
* Node.js
* npm

---

## Features

### Employee Management

* View employees
* Search employees
* Add employees
* Edit employees
* Delete employees

### UI

* Responsive layout
* Dark theme
* Material UI components
* Modal-based editing workflow

### Persistence

* H2 file-based database
* Data survives application restarts

---

## Project Structure

```text
sprout/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.tsx
│   │   │   ├── EmployeeTable.tsx
│   │   │   └── EmployeeEditDialog.tsx
│   │   │
│   │   ├── pages/
│   │   │   └── EmployeesPage.tsx
│   │   │
│   │   ├── services/
│   │   │   └── employeeService.ts
│   │   │
│   │   ├── theme/
│   │   │   └── theme.ts
│   │   │
│   │   ├── types/
│   │   │   └── Employee.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── config/
│
└── README.md
```

---

## Running the Application

### Backend

```bash
cd backend

./mvnw spring-boot:run
```

Backend will start on:

```text
http://localhost:8490
```

---

### Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend will start on:

```text
http://localhost:5173
```

---

## Database

Sprout uses a file-based H2 database.

Example configuration:

```properties
spring.datasource.url=jdbc:h2:file:./data/sprout

spring.jpa.hibernate.ddl-auto=update

spring.h2.console.enabled=true
```

H2 Console:

```text
http://localhost:8490/h2-console
```

---

## REST API

### Get Employees

```http
GET /api/employees
```

### Create Employee

```http
POST /api/employees
```

Request Body:

```json
{
  "name": "John Doe",
  "role": "Developer"
}
```

### Update Employee

```http
PUT /api/employees/{id}
```

### Delete Employee

```http
DELETE /api/employees/{id}
```

---

## Learning Goals

This project is intended to provide hands-on experience with:

* React fundamentals
* TypeScript
* Component architecture
* State management
* REST API integration
* Spring Boot backend development
* CRUD application design
* Material UI
* Full-stack application deployment

---

## Future Enhancements

* Form validation
* Backend validation with Bean Validation
* Snackbar notifications
* Confirmation dialogs
* Pagination
* Sorting
* Department management
* React Router
* Authentication and authorization
* JWT security
* Docker support
* Single JAR deployment with bundled frontend

---

## License

This project is intended for learning and experimentation.
