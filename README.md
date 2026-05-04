# 📱 OTP Verification System

## 📌 Overview

This project is a full-stack OTP (One-Time Password) verification system built using **Node.js, Express, MongoDB, and Angular**.
It allows users to authenticate via phone number using OTP with expiry validation and JWT-based authentication.

---

## 🚀 Tech Stack

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication
* Serverless-ready (AWS Lambda compatible)

### 🔹 Frontend

* Angular
* TypeScript
* HttpClient API integration

---

## ✨ Features

* 📲 Send OTP to phone number (mocked via console)
* ⏱ OTP expiry (2 minutes)
* ✅ OTP verification
* 🔐 JWT-based authentication
* 🔒 Protected API route
* 🌐 RESTful API design
* ☁️ Serverless-ready backend (AWS Lambda compatible)
* 🎨 Simple Angular UI for interaction

---

## 📁 Project Structure

```
otp-backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── server.js
  └── .env

otp-frontend/
  ├── src/app/otp/
  └── angular app files
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd otp-backend
```

---

### 2️⃣ Backend Setup

```
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```
cd otp-frontend
npm install
ng serve
```

Frontend runs on:

```
http://localhost:4200
```

---

## 🔗 API Endpoints

### 📤 Send OTP

```
POST /api/auth/send-otp
```

**Body:**

```
{
  "phone": "9876543210"
}
```

---

### ✅ Verify OTP

```
POST /api/auth/verify-otp
```

**Body:**

```
{
  "phone": "9876543210",
  "otp": "123456"
}
```

---

### 🔐 Protected Route

```
GET /api/auth/profile
```

**Headers:**

```
Authorization: <JWT_TOKEN>
```

---

## 🧠 Architecture & Design Decisions

* Modular backend structure (controllers, routes, models)
* Environment-based configuration using `.env`
* OTP stored with expiry for validation
* JWT used for stateless authentication
* Angular used for clean UI separation
* Backend structured to support serverless deployment

---

## ☁️ AWS Deployment Approach

The backend is designed to be deployable using **AWS Lambda and API Gateway**.

### Steps:

1. Express app wrapped using `serverless-http`
2. Deployed via Serverless Framework
3. API Gateway handles routing
4. MongoDB Atlas used as external database

> Due to time constraints, the application is currently running locally but is fully compatible with serverless deployment.

---

## 🔮 Future Improvements

* Integrate real SMS service (Twilio)
* Add rate limiting for OTP requests
* Improve UI with Angular Material
* Add unit and integration tests
* Deploy full stack (Frontend + Backend)

---

## 👤 Author

**Pranal Patil**
Full Stack Developer (6+ years experience)

---

## 🙌 Acknowledgment

Thank you for the opportunity to work on this assignment.
