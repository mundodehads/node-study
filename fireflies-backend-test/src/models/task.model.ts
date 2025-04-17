import { Document, Types } from "mongoose";

export interface ITask extends Document {
  meetingId: Types.ObjectId;
  userId: string;
  title: string;
  description: string;
  status: "pending" | "inProgress" | "completed";
  dueDate: Date;
}

export interface OverdueTask {
  _id: Types.ObjectId;
  title: string;
  dueDate: Date;
  meetingId: Types.ObjectId;
  meetingTitle: string;
}
