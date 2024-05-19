export interface LessonType {
  idx: number;
  studentName: string;
  subject: string;
  count?: number | undefined;
}

export interface ScheduleType {
  idx: number;
  status: string;
  count: string;
  isLastCount: boolean;
}

export interface PreviewBannerScheduleType {
  lesson: LessonType;
  timeStatus: number;
  schedule: ScheduleType;
}
