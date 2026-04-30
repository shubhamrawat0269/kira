import mongoose from "mongoose";
import projectSchema from "../schema/project.schema.js";

const Project = mongoose.model("Project", projectSchema);

export default Project;
