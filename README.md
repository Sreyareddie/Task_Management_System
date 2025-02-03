# Task Management System
# Live Link - https://task-management-system-vun7.onrender.com
## Overview
The **Task Management System** is a web application built using the **MERN** stack (**MongoDB, Express.js, React.js, and Node.js**) that allows users to efficiently create, update, and manage their tasks. This system is designed to enhance productivity by providing an intuitive user interface and a robust backend.

## Features
- User Authentication (Login & Registration)
- Create,and Delete tasks
- Categorize tasks (e.g., Pending, Completed, Done)
- Task due dates
- Feed page to add images and captions
- API-based communication between frontend and backend

## Tech Stack
- **Frontend**: React.js, bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/Sreyareddie/Task_Management_System
cd Task_Management_System
```

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```

### Running the Application
Once both the backend and frontend are running, open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints
### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user

### Tasks
- **GET** `/api/task/list` - Fetch all tasks
- **POST** `/api/task/add` - Create a new task
- **PUT** `/api/task/updateStatus` - Update a task
- **DELETE** `/api/task/remove` - Delete a task
  
### Feed
- **GET** `/api/feed/list` - Fetch all posts on Feed
- **POST** `/api/feed/add` - Create a new post


## License
This project is licensed under the **MIT License**.

---
**Happy Coding!** 🚀

