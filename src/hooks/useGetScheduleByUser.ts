import { useQuery } from "react-query";
import { getScheduleByUser } from "../api/getScheduleByUser";
import { scheduleType } from "../type/scheduleType";

interface dailyScheduleListType {
  lessonIdx: number;
  schedule: scheduleType;
}
[];

interface scheduleListType {
  date: string;
  dayOfWeek: string;
  dailyScheduleList: dailyScheduleListType[];
}
[];

export default function useGetScheduleByUser(date: string): { isUserSchedule: scheduleListType[] } {
  const { data: isUserSchedule } = useQuery(["getScheduleByUser", date], () => getScheduleByUser(date), {
    onError: (error) => {
      console.log(error);
    },
  });

  return { isUserSchedule };
}
