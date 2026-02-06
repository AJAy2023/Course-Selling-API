# 📚 Course Platform Backend API

A RESTful backend API for a course platform where:
- Instructors can create and manage courses & lessons  
- Students can purchase courses and access lessons  
- Built with Node.js, Express, MongoDB, and JWT authentication

---

##  Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **JWT** – Authentication & Authorization  

---

##  Getting Started

### 1️⃣ Clone the Repository
```bash

git clone https://github.com/Ajay2023/Course-Selling-API.git
cd backend cd src

```

### 2️⃣ Install Dependencies
```bash 
npm install
```

### 3️⃣ Environment Variables

```bash
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
### 4️⃣ Run the Server

```bash
npm run dev
```
## server runs:
```
http://localhost:9000
```

### Authentication APIs

```bash
| Method | Endpoint        | Description             | Access  |
| ------ | --------------- | ----------------------- | ------- |
| POST   | `/api/register` | Register a new user     | Public  |
| POST   | `/api/login`    | Login & get JWT token   | Public  |
| GET    | `/api/me`       | Get logged-in user info | Private |

```

### Course APIs
```bash
| Method | Endpoint                | Description         | Access     |
| ------ | ----------------------- | ------------------- | ---------- |
| POST   | `/course/create-course` | Create a new course | Tutor only |
| GET    | `/course/getAllCourses` | Get all courses     | Public     |
| GET    | `/course/:id`           | Get course by ID    | Public     |
| PATCH  | `/course/:id`           | Update course       | Tutor only |
| DELETE | `/course/:id`           | Delete course       | Tutor only |
```


### Lesson APIs
```bash
| Method | Endpoint              | Description                 | Access     |
| ------ | --------------------- | --------------------------- | ---------- |
| POST   | `/addlessions/:id`    | Add lesson to a course      | Tutor only |
| GET    | `/courselessions/:id` | Get all lessons of a course | Public     |
```

### Purchase APIs
```bash
| Method | Endpoint                  | Description                       | Access |
| ------ | ------------------------- | --------------------------------- | ------ |
| POST   | `/purchase/:id`           | Purchase a course                 | User   |
| GET    | `/getpurchasecourses/:id` | Get all purchased courses of user | User   |
```




👨‍💻 Author ❤
Ajay Jadhav

