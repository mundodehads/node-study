import { Schema, model } from "mongoose";
import { ITask } from "../../models/task";

const taskSchema = new Schema<ITask>({
  meetingId: { type: Schema.Types.ObjectId, ref: "Meeting" },
  userId: String,
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "inProgress", "completed"],
    default: "pending",
  },
  dueDate: Date,
});

export const Task = model<ITask>("Task", taskSchema);
