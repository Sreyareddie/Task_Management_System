import {
  addTask,
  listTask,
  removeTask,
  updateStatus,
} from "../controllers/taskController.js";
import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";

const taskRouter = express.Router();

taskRouter.post("/add", authenticateUser, addTask);

taskRouter.get("/list", authenticateUser, listTask);

taskRouter.post("/remove", authenticateUser, removeTask);

taskRouter.post("/updateStatus", authenticateUser, updateStatus);

export default taskRouter;
