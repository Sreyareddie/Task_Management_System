import express from "express";
import cors from "cors";
import "dotenv/config";
import taskRouter from "./src/routes/taskRouter.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import userRouter from "./src/routes/userRouter.js";
import feedRouter from "./src/routes/feedRouter.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
const _dirname=path.resolve();

connectDB();
connectCloudinary();

app.use(express.json());

app.use(cors());

app.use("/api/task", taskRouter);
app.use("/api/feed", feedRouter);
app.use("/api/user", userRouter);

app.use(express.static(path.join(_dirname,"../client/dist")));
app.get("*",(req,res)=>{res.sendFile(path.resolve(_dirname,"../client/dist","index.html"));})

app.get("/", (req, res) => res.send("API working"));

app.listen(port, () => console.log(`Server started on ${port}`));
