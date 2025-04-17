import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import MeetingsController from "./meetings/meetings.controller.js";
import DashboardController from "./dashboard/dashboard.controller.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

await mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/meetingbot")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MeetingBot API" });
});

app.use("/api/meetings", authMiddleware, MeetingsController);
app.use("/api/dashboard", authMiddleware, DashboardController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
