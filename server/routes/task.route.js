import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import Task from "../models/task.model.js";

const router = express.Router();

router.post("/create-task", authMiddleware, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({
        message: "Title and projectId are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo: assignedTo || null,
    });

    res.status(201).json({
      status: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

router.patch("/:taskId/status", authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );

    res.status(200).json({
      status: true,
      message: "Status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

export default router;
