import { calendarLessonsType } from "./calendarLessonsType";

interface scheduleListType {
  endTime: string;
  startTime: string;
  studentName: string;
  subject: string;
}

interface temporaryListType {
  date: string;
  scheduleList: any;
}

export interface DayItemProps {
  date: Date;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  myLessons?: calendarLessonsType;
  myChildLessons?: calendarLessonsType;
  temporRegularSchedule?: any;
}
