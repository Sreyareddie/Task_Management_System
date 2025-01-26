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

app.use(cors());

app.use("/api/task", taskRouter);
app.use("/api/feed", feedRouter);
app.use("/api/user", userRouter);



app.get("/", (req, res) => res.send("API working"));
// In server.js, update your listen callback
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.PORT} mode on port ${port}`);
});

app.listen(port, () => console.log(`Server started on ${port}`));
