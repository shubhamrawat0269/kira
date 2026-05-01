import Project from "../models/project.model.js";

const isProjectAdmin = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // 1. Check if project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // 2. Find current user inside project members
    const member = project.members.find(
      (m) => m.user.toString() === req.user.userId,
    );

    // 3. Check if user is admin
    if (!member || member.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
      });
    }

    // 4. Attach project (optional but useful)
    req.project = project;

    next();
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: "Server error",
    });
  }
};

export default isProjectAdmin;