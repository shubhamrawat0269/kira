import express from "express";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import isProjectAdmin from "../middleware/admin.middleware.js";
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
      members: [
        {
          user: req.user.userId,
          role: "admin",
        },
      ],
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

router.post(
  "/:projectId/add-user",
  authMiddleware,
  isProjectAdmin,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { email } = req.body;

      // 1. Find user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // 2. Find project
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      // 3. Check already member
      const alreadyMember = project.members.some(
        (m) => m.user.toString() === user._id.toString(),
      );

      if (alreadyMember) {
        return res.status(400).json({
          message: "User already added",
        });
      }

      // 4. Add user
      project.members.push({
        user: user._id,
        role: "member",
      });

      await project.save();

      res.status(200).json({
        message: "User added successfully",
        project,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Server error",
      });
    }
  },
);

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
