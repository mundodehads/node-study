import { UpcomingMeeting } from "./meeting.model";
import { OverdueTask } from "./task.model";

export interface DashboardData {
  totalMeetings: number;
  taskSummary: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  upcomingMeetings: UpcomingMeeting[];
  overdueTasks: OverdueTask[];
}
