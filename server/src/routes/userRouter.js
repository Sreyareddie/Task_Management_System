import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  profile,
} from "../controllers/userController.js";
import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.get("/profile", authenticateUser, profile);

export default userRouter;
