# 📘 School Management API

A Node.js + Express.js + MySQL REST API to manage schools and fetch them sorted by distance from a user location.

---


## ⚙️ Features

- Add School API
- List Schools API (sorted by distance)
- Haversine formula for distance calculation
- MySQL (Railway cloud database)
- Fully deployed on Render

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- Render (Deployment)
- Railway (Database)

---

## 📂 Project Structure

```bash
school-management-api/
│
├── src/
│   ├── controllers/
│   │   └── school.controller.js      // Handles API logic (addSchool, listSchools)
│   │
│   ├── routes/
│   │   └── school.route.js          // Defines API endpoints (/addSchool, /listSchools)
│   │
│   ├── db/
│   │   └── index.js                 // MySQL connection setup (Railway DB)
│   │
│   ├── utils/
│   │   ├── ApiError.js              // Custom error handling class
│   │   ├── ApiResponse.js           // Standard API response format
│   │   └── asyncHandler.js         // Wrapper for async error handling
│   │
│   ├── app.js                      // Express app setup (middlewares, routes)
│   ├── constant.js                 // DB name or constants
│   └── index.js                    // Server entry point (listen port + DB connect)
│
├── .env                            // Environment variables (DB_URL, PORT, etc.)
├── package.json                    // Dependencies & scripts
└── README.md                       // Project documentation
```



---

## 🗄 Database Schema

### Table: `schools`

```bash
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(255) NOT NULL
address VARCHAR(255) NOT NULL
latitude REAL NOT NULL
longitude REAL NOT NULL

```


---

## Setup (Local)

To run this project locally:  

1️. Clone the repository: 

```bash
git clone https://github.com/Sarvesh7617/School_Mangement_System
```

2. Navigate to the project directory:

```bash
cd school-management-api
```

3. Install dependencies

```bash
npm install
```

4. Run the project

```bash
npm run dev
```

## Environment Variables

```bash
PORT=5000
DATABASE_URL=mysql://user:password@host:port/database     //railway mysql database url
CORS_ORIGIN=*
```

---
## 🚀 Live URL

👉 [Click here to api test](https://school-mangement-system-cxep.onrender.com)

---

##  API Endpoints

###  Add School

```bash
POST /api/v1/school/addSchool
```


### Request Body

```json
{
  "name": "ABC School",
  "address": "Lucknow",
  "latitude": 26.85,
  "longitude": 80.94
}
```

### Response

```bash
{
  "statusCode": 201,
  "data": {
    "schoolId": 1
  },
  "message": "School added successfully",
  "success": true
}
```



### List Schools (Sorted by Distance)

```bash
GET /api/v1/school/listSchools?latitude=26.85&longitude=80.94
```


### Response

```bash
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Lucknow",
      "latitude": 26.85,
      "longitude": 80.94,
      "distance": 0
    }
  ],
  "message": "Schools fetched successfully",
  "success": true
}

```


## Distance Calculation

- Haversine Formula used
- Calculates distance between user and school coordinates
- Results sorted (nearest first)



## Deployment

- Backend: Render
- Database: Railway MySQL
- Version Control: GitHub
