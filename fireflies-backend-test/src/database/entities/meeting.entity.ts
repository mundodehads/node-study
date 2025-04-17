import { Schema, model } from "mongoose";
import { IMeeting } from "../../models/meeting.model";

const meetingSchema = new Schema<IMeeting>({
  userId: String,
  title: String,
  date: Date,
  participants: [String],
  transcript: String,
  summary: String,
  duration: Number,
  actionItems: [String],
});

export const Meeting = model<IMeeting>("Meeting", meetingSchema);
