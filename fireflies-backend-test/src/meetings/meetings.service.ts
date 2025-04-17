import { Meeting } from "../database/entities/meeting.entity";
import { Task } from "../database/entities/task.entity";
import { Stats } from "../models/stats.model";
import { CreateMeetingDto } from "./dto/meeting.dto";

export default class MeetingsService {
  public async getMeetings(
    limit: number,
    page: number
  ): Promise<InstanceType<typeof Meeting>[]> {
    const skip = (page - 1) * limit;

    return Meeting.find().skip(skip).limit(limit);
  }

  public async getStats(): Promise<Stats> {
    const stats = await Meeting.aggregate([
      {
        $facet: {
          generalStats: [
            {
              $group: {
                _id: null,
                totalMeetings: { $sum: 1 },
                totalParticipants: { $sum: { $size: "$participants" } },
                shortestMeeting: { $min: "$duration" },
                longestMeeting: { $max: "$duration" },
                totalDuration: { $sum: "$duration" },
              },
            },
            {
              $project: {
                _id: 0,
                totalMeetings: 1,
                averageParticipants: {
                  $divide: ["$totalParticipants", "$totalMeetings"],
                },
                totalParticipants: 1,
                shortestMeeting: 1,
                longestMeeting: 1,
                averageDuration: {
                  $divide: ["$totalDuration", "$totalMeetings"],
                },
              },
            },
          ],
          topParticipants: [
            { $unwind: "$participants" },
            {
              $group: {
                _id: "$participants",
                meetingCount: { $sum: 1 },
              },
            },
            { $sort: { meetingCount: -1 } },
            { $limit: 5 },
            {
              $project: {
                participant: "$_id",
                meetingCount: 1,
                _id: 0,
              },
            },
          ],
          meetingsByDayOfWeek: [
            {
              $group: {
                _id: { $dayOfWeek: "$date" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                dayOfWeek: "$_id",
                count: 1,
                _id: 0,
              },
            },
            { $sort: { dayOfWeek: 1 } },
          ],
        },
      },
      {
        $project: {
          generalStats: { $arrayElemAt: ["$generalStats", 0] },
          topParticipants: 1,
          meetingsByDayOfWeek: 1,
        },
      },
    ]);

    return stats[0];
  }

  public async createMeeting(
    data: CreateMeetingDto
  ): Promise<InstanceType<typeof Meeting>> {
    const meeting = new Meeting(data);
    return meeting.save();
  }

  public async getMeetingById(
    id: string
  ): Promise<InstanceType<typeof Meeting> | null> {
    return Meeting.findById(id);
  }

  public async updateTranscript(
    id: string,
    transcript: string
  ): Promise<InstanceType<typeof Meeting> | null> {
    return Meeting.findByIdAndUpdate(id, { transcript }, { new: true });
  }

  public async summarizeMeeting(
    id: string
  ): Promise<{ summary: string; actionItems: string[] } | null> {
    const meeting = await Meeting.findById(id);

    if (!meeting) return null;

    // Simulate an AI service to generate a summary and action items
    const aiResponse = {
      summary: `Your meeting recap - ${meeting.title || ""}`,
      actionItems: [
        "Schedule the next meeting",
        "Start background check process",
        "Send follow-up email to stackholders",
      ],
    };

    const tasks = aiResponse.actionItems.map((actionItem) => ({
      meetingId: meeting._id,
      userId: meeting.userId,
      title: actionItem,
      description: `Task generated from meeting "${meeting.title}"`,
      status: "pending",
      dueDate: new Date(),
    }));

    await Task.insertMany(tasks);

    return {
      summary: aiResponse.summary,
      actionItems: aiResponse.actionItems,
    };
  }
}
