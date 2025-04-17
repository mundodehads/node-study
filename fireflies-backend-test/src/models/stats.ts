export interface GeneralStats {
  totalMeetings: number;
  averageParticipants: number;
  totalParticipants: number;
  shortestMeeting: number;
  longestMeeting: number;
  averageDuration: number;
}

export interface Participants {
  participant: string;
  meetingCount: number;
}

export interface MeetingByDayOfWeek {
  dayOfWeek: number;
  count: number;
}

export interface Stats {
  generalStats: GeneralStats;
  topParticipants: Participants[];
  meetingsByDayOfWeek: MeetingByDayOfWeek[];
}
