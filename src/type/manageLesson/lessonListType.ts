export interface latestRegularScheduleType {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface lessonListType {
  idx: number;
  studentName: string;
  subject: string;
  percent: number;
  isFinished: boolean;
  latestRegularSchedule: latestRegularScheduleType;
}
