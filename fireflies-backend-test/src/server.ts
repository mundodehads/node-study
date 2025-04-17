import "dotenv/config";
import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import MeetingsController from "./meetings/meetings.controller";
import DashboardController from "./dashboard/dashboard.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import MeetingsService from "./meetings/meetings.service";
import DashboardService from "./dashboard/dashboard.service";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/meetingbot")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MeetingBot API" });
});

const meetingsService = new MeetingsService();
app.use("/api/meetings", authMiddleware, MeetingsController(meetingsService));

const dashboardService = new DashboardService();
app.use(
  "/api/dashboard",
  authMiddleware,
  DashboardController(dashboardService)
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
