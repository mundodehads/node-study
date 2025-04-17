import { Meeting } from "../database/entities/meeting.js";
import { Stats } from "../models/stats.js";

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
}
