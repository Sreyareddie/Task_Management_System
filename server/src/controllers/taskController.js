import taskModel from "../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
    const { name, description, startDate, dueDate, status } = req.body;
    const userId = req.userId;

    if (!name || !description || !startDate || !dueDate || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new taskModel({
      name,
      description,
      startDate,
      dueDate,
      status,
      userId,
    });

    await task.save();

    res.json({ success: true, message: "Task Added" });
  } catch (error) {
    console.error("Error in addTask:", error);
    res.status(500).json({ success: false, message: "Failed to add task" });
  }
};

export const listTask = async (req, res) => {
  try {
    const userId = req.userId;

    const allTasks = await taskModel.find({ userId });
    res.json({ success: true, tasks: allTasks });
  } catch (error) {
    console.error("Error in listTask:", error);
    res.status(500).json({ success: false, message: "Failed to list tasks" });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.userId;

    const task = await taskModel.findOneAndDelete({ _id: id, userId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }

    res.json({ success: true, message: "Task Removed" });
  } catch (error) {
    console.error("Error in removeTask:", error);
    res.status(500).json({ success: false, message: "Failed to remove task" });
  }
};

export const updateStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update task status" });
  }
};
