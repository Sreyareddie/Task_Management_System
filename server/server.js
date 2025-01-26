import express from "express";
import cors from "cors";
import "dotenv/config";
import taskRouter from "./src/routes/taskRouter.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import userRouter from "./src/routes/userRouter.js";
import feedRouter from "./src/routes/feedRouter.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
const corsOptions = {
  origin: "https://task-management-system-frontend-wheat.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};


app.use(cors(corsOptions));

app.use("/api/task", taskRouter);
app.use("/api/feed", feedRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.send("API working"));

app.listen(port, () => console.log(`Server started on ${port}`));
