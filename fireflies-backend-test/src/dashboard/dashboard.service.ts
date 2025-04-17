import { Meeting } from "../database/entities/meeting.js";
import { DashboardData } from "../models/dashboard";

export default class DashboardService {
  public async getDashboard(): Promise<DashboardData> {
    const now = new Date();

    const [dashboardData] = await Meeting.aggregate([
      {
        $facet: {
          totalMeetings: [{ $count: "count" }],
          upcomingMeetings: [
            { $match: { date: { $gte: now } } },
            { $sort: { date: 1 } },
            { $limit: 5 },
            {
              $project: {
                _id: 1,
                title: 1,
                date: 1,
                participantCount: { $size: "$participants" },
              },
            },
          ],
          taskSummary: [
            {
              $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "meetingId",
                as: "tasks",
              },
            },
            { $unwind: "$tasks" },
            {
              $group: {
                _id: "$tasks.status",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                status: "$_id",
                count: 1,
                _id: 0,
              },
            },
          ],
          overdueTasks: [
            {
              $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "meetingId",
                as: "tasks",
              },
            },
            { $unwind: "$tasks" },
            {
              $match: {
                "tasks.dueDate": { $lt: now },
                "tasks.status": { $ne: "completed" },
              },
            },
            {
              $project: {
                _id: "$tasks._id",
                title: "$tasks.title",
                dueDate: "$tasks.dueDate",
                meetingId: "$_id",
                meetingTitle: "$title",
              },
            },
          ],
        },
      },
      {
        $project: {
          totalMeetings: { $arrayElemAt: ["$totalMeetings.count", 0] },
          upcomingMeetings: 1,
          taskSummary: 1,
          overdueTasks: 1,
        },
      },
    ]);

    const pendingTasks =
      dashboardData.taskSummary.find((task: any) => task.status === "pending")
        ?.count || 0;

    const inProgressTasks =
      dashboardData.taskSummary.find(
        (task: any) => task.status === "inProgress"
      )?.count || 0;

    const completedTasks =
      dashboardData.taskSummary.find((task: any) => task.status === "completed")
        ?.count || 0;

    const response = {
      totalMeetings: dashboardData.totalMeetings || 0,
      taskSummary: {
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
      },
      upcomingMeetings: dashboardData.upcomingMeetings || [],
      overdueTasks: dashboardData.overdueTasks || [],
    };

    return response;
  }
}
