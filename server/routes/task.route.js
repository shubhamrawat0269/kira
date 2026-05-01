import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

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

router.delete("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      status: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

router.patch("/:taskId/assign", authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    // 1. Validate input
    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    // 2. Find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    // 3. Get project
    const project = await Project.findById(task.projectId);

    if (!project) {
      return res.status(404).json({
        status: false,
        message: "Project not found",
      });
    }

    const isAdmin = project.members.some(
      (m) => m.user.toString() === req.user.userId && m.role === "admin",
    );

    if (!isAdmin) {
      return res.status(403).json({
        status: false,
        message: "Only admin can assign tasks",
      });
    }

    // 4. Check if user is member of project
    const isMember = project.members.some((m) => m.user.toString() === userId);

    if (!isMember) {
      return res.status(400).json({
        status:false,
        message: "User is not part of this project",
      });
    }

    task.assignedTo = userId;
    await task.save();

    res.status(200).json({
      status: true,
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

export default router;
