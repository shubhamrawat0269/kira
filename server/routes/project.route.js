import express from "express";
import Project from "../models/project.model.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-project", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      status: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

router.get("/get-project", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await Project.find({
      createdBy: userId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

export default router;
