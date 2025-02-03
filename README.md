![Feed](https://github.com/user-attachments/assets/1f857a6a-7661-41d5-94b9-097908cc4b4f)# Task Management System
# Live Link - https://task-management-system-vun7.onrender.com
## Overview
The **Task Management System** is a web application built using the **MERN** stack (**MongoDB, Express.js, React.js, and Node.js**) that allows users to efficiently create, update, and manage their tasks. Users can also post images via feed and see others posts. This system is designed to enhance productivity by providing an intuitive user interface and a robust backend.

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
   CLOUDINARY_NAME=your cloudianary name
   CLOUDINARY_API_KEY=your cloudinary api
   CLOUDINARY_API_SECRET=your cloudinary api secret
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your email id
   EMAIL_PASS=your email app password
   EMAIL_SERVICE= "gmail"
   FRONTEND_URL=your frontend url
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

### Screenshots
![Login](https://github.com/user-attachments/assets/ad45ebdf-6ede-4115-aa22-d2d1f8e91b8f)
![Forgot Password](https://github.com/user-attachments/assets/0cccb620-e754-4992-ae43-1e15adf34e5f)
![Register](https://github.com/user-attachments/assets/96afb595-24d7-4916-aa45-76164fef2da0)
![Reset Email](https://github.com/user-attachments/assets/f6029e57-4839-4aa9-8603-e10edb90f3b0)
![Reset Page](https://github.com/user-attachments/assets/d6c3348b-c997-4e8e-8c66-3edc4c27170a)
![Dashboard](https://github.com/user-attachments/assets/7812b39a-841a-434b-bc5f-2821ededd5f3)
![TaskBoard](https://github.com/user-attachments/assets/7a6e3c92-2d93-46e1-b580-6be8467af0cf)
![AddTask](https://github.com/user-attachments/assets/0c7443aa-0041-4ec2-8205-8aac637bcc75)
![Feed](https://github.com/user-attachments/assets/49d46c11-113a-4daa-b3f6-ac9919ee958a)
![AddFeed](https://github.com/user-attachments/assets/6b31a161-5c03-47f0-8a92-092e7cd82fbf)



## License
This project is licensed under the **MIT License**.

---
**Happy Coding!** 🚀

