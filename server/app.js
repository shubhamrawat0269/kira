import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config();

import userRoutes from "./routes/user.route.js";

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

export default app;
