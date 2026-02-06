# Course Platform Backend API
A RESTful backend API for a course platform where instructors can create and manage courses, students can purchase courses, and users can access course lessons. Built with Node.js, Express, MongoDB, and JWT-based authentication.

# Tech Stack
Node.js – Runtime environment
Express.js – Web framework
MongoDB – NoSQL database
Mongoose – ODM for MongoDB
JWT (JSON Web Token) – Authentication & Authorization


1. Clone the repository
    git clone  https://github.com/AJAy2023/Course-Selling-API.git
    cd backend , cd src 

2.  Install dependencies
     npm install
3. Environment Variables (.env)
    PORT=9000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development

4. Run the server
    npm run dev

5. Server will start on:
    http://localhost:9000

# Authentication APIs
Method	Endpoint	        Description
POST	/api/register	    Register a new user
POST	/api/login	         Login user & get token
GET	    /api/me	              Getlogged-in user info
    

/api/me requires JWT token in Authorization header
Authorization: Bearer <token>

# Course APIs
Method	Endpoint	            Description	Access
POST	/create-course	        Create a new course	Tutor only
GET	    /course/getAllCourses	Get all courses	Public
GET 	/course/:id	Get single  course details	Public
PATCH	/course/:id	Update a    course	Tutor only
DELETE	/course/:id	Delete a    course	Tutor only


# Lesson APIs
Method	Endpoint	            Description	Access
POST	/addlessions/:id	    Add lesson to a course	Tutor only
GET	    /courselessions/:id	    Get all lessons of a course	Public


# Purchase APIs
Method	Endpoint	        Description	Access
POST	/purchase/:id	    Purchase a course	User
GET	/getpurchasecourses/:id	    Get all purchased courses of a user	User

# Authorization Rules
Role	    Permissions
Tutor	    Create, update, delete courses & lessons
User	    Purchase courses, view purchased courses

Author
Built with ❤️ by Ajay Jadhav