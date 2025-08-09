# Natours API

A complete RESTful API for a fictional tour booking application, built with **Node.js**, **Express**, and **MongoDB**.  
Implements advanced API features like filtering, sorting, pagination, authentication, authorization, and error handling.

---

## 🚀 Features

### 🏗 Project Setup

- Initialized Express backend with ESLint + Prettier (Airbnb config)
- Connected to MongoDB with Mongoose
- Implemented MVC architecture for scalability

### 🗺 Tour Features

- CRUD operations for Tours
- Advanced filtering, sorting, field limiting, and pagination
- Alias route for top 5 cheapest tours
- Aggregation pipelines for:
  - Tour statistics
  - Monthly tour plan
- Virtual properties for computed data (`durationWeeks`)
- Middleware for hiding secret tours

### 👤 User & Authentication

- User model with validation
- Password encryption with **bcryptjs**
- JWT-based signup & login
- Protected routes for sensitive endpoints
- Middleware to check if user exists and handle password changes
- Password update route for logged-in users

### ⚙️ Error Handling

- Centralized error handling using custom `AppError` class
- Global error handler for dev & prod environments
- Mongoose error handling for:
  - Invalid IDs
  - Duplicate fields
  - Validation errors
- Handling **unhandled promise rejections** & **uncaught exceptions**
- 404 Not Found route handler

---

## 📡 API Endpoints

### Tours

| Method | Endpoint          | Description                                                   |
| ------ | ----------------- | ------------------------------------------------------------- |
| GET    | /api/v1/tours     | Get all tours (with filtering, sorting, limiting, pagination) |
| GET    | /api/v1/tours/:id | Get a tour by ID                                              |
| POST   | /api/v1/tours     | Create a new tour                                             |
| PATCH  | /api/v1/tours/:id | Update a tour by ID                                           |
| DELETE | /api/v1/tours/:id | Delete a tour by ID                                           |

### Users

| Method | Endpoint                       | Description                     |
| ------ | ------------------------------ | ------------------------------- |
| POST   | /api/v1/users/signup           | Register a new user             |
| POST   | /api/v1/users/login            | Log in and get JWT              |
| PATCH  | /api/v1/users/updateMyPassword | Update password (authenticated) |

---

## 🛠 Tech Stack

- **Node.js** + **Express** for server
- **MongoDB** + **Mongoose** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **morgan** for request logging
- **dotenv** for environment variables

---

## 📌 Installation

```bash
git clone https://github.com/Harshjha002/natours.git
cd natours
npm install
npm start
```
