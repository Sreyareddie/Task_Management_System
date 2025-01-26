import {
  addFeed,
  listFeed,
  removeFeed,
} from "../controllers/feedController.js";
import express from "express";
import upload from "../middleware/multer.js";
import authenticateUser from "../middleware/authenticateUser.js";

const feedRouter = express.Router();

feedRouter.post("/add", upload.single("image"), authenticateUser, addFeed);
feedRouter.get("/list", authenticateUser, listFeed);

feedRouter.post("/remove", authenticateUser, removeFeed);

export default feedRouter;
