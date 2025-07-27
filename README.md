# TaskMaster Backend API

This is the backend API for **TaskMaster**, a productivity app that allows users to manage projects and tasks.  
The API is built with **Node.js, Express, and MongoDB**, with full **JWT authentication** and secure ownership-based authorization.

---

## # Features
- User registration and login with JWT authentication.
- Projects can be created, updated, viewed, and deleted.
- Each project belongs to a specific user.
- Tasks can be created and managed under specific projects.
- All endpoints are protected with ownership checks.

---

## # Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing
- dotenv for environment variables

---

## # Project Structure


```bash

taskmaster-backend/
│
├── config/
│ └── db.js # MongoDB connection
│
├── models/
│ ├── User.js # User model (with bcrypt password hashing)
│ ├── Project.js # Project model (references User)
│ └── Task.js # Task model (references Project)
│
├── routes/
│ ├── users.js # Registration and login routes
│ ├── projects.js # Project CRUD routes
│ └── tasks.js # Task CRUD routes (nested under projects)
│
├── utils/
│ └── auth.js # JWT token signing and auth middleware
│
├── .env # Environment variables (not committed)
├── .gitignore # node_modules and .env are ignored
└── server.js # Entry point

```

## # Setup Instructions

# Clone the repository and navigate into it
git clone <your-repo-url>
cd taskmaster-backend

# Install dependencies
npm install

# Create a .env file in the root directory (replace with your values)
echo "PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmaster?retryWrites=true&w=majority
JWT_SECRET=your_secret_key" > .env

# Start the server (with auto-restart)
npm run dev

# The API will be available at:
# http://localhost:3001


---

## # Using Postman to Test the API

# 1. Register a User
# Method: POST
# URL: http://localhost:3001/api/users/register
# In Postman: Body → raw → JSON
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "mypassword123"
}
# Click Send. Copy the "token" from the response for later.

# 2. Login to Get a Token
# Method: POST
# URL: http://localhost:3001/api/users/login
# In Postman: Body → raw → JSON
{
  "email": "alice@example.com",
  "password": "mypassword123"
}
# Click Send. Copy the "token" from the response.
# Use this token for all protected Project and Task routes.

# 3. Create a Project
# Method: POST
# URL: http://localhost:3001/api/projects
# In Postman: Authorization → Bearer Token (paste your token)
# Body → raw → JSON
{
  "name": "My Project",
  "description": "Optional description"
}
# Click Send. Save the "_id" of the created project.

# 4. List All Projects
# Method: GET
# URL: http://localhost:3001/api/projects
# In Postman: Authorization → Bearer Token (paste your token)
# Click Send to see all projects for your user.

# 5. Get a Single Project by ID
# Method: GET
# URL: http://localhost:3001/api/projects/<projectId>
# In Postman: Authorization → Bearer Token (paste your token)
# Replace <projectId> with the actual project "_id".
# Click Send to see the project details.

# 6. Update a Project
# Method: PUT
# URL: http://localhost:3001/api/projects/<projectId>
# In Postman: Authorization → Bearer Token (paste your token)
# Body → raw → JSON
{
  "name": "Updated Project",
  "description": "Updated description"
}
# Click Send to update the project.

# 7. Delete a Project
# Method: DELETE
# URL: http://localhost:3001/api/projects/<projectId>
# In Postman: Authorization → Bearer Token (paste your token)
# Click Send to delete the project.

# 8. Create a Task in a Project
# Method: POST
# URL: http://localhost:3001/api/projects/<projectId>/tasks
# In Postman: Authorization → Bearer Token (paste your token)
# Body → raw → JSON
{
  "title": "My Task",
  "description": "Optional task description"
}
# Click Send. Save the "_id" of the task.

# 9. List All Tasks for a Project
# Method: GET
# URL: http://localhost:3001/api/projects/<projectId>/tasks
# In Postman: Authorization → Bearer Token (paste your token)
# Click Send to view all tasks in the project.

# 10. Update a Task
# Method: PUT
# URL: http://localhost:3001/api/projects/tasks/<taskId>
# In Postman: Authorization → Bearer Token (paste your token)
# Body → raw → JSON
{
  "status": "In Progress"
}
# Click Send to update the task.

# 11. Delete a Task
# Method: DELETE
# URL: http://localhost:3001/api/projects/tasks/<taskId>
# In Postman: Authorization → Bearer Token (paste your token)
# Click Send to delete the task.


---

## # Notes

# - All protected routes require a Bearer token.
# - Tokens are obtained via the login endpoint.
# - Passwords are hashed using bcrypt before saving.
# - JWT tokens expire in 2 hours by default.
# - Users can only manage their own projects and tasks.

---

## # License

# This project is for educational purposes only and not intended for production use.