import { useQuery } from "react-query";

import { getTodayScheduleByParents } from "../api/getTodayScheduleByParents";

export default function useGetTodayScheduleByParents() {
  const { data: todayScheduleParents } = useQuery(["getTodayScheduleByParents"], getTodayScheduleByParents, {});

  const parentsName = todayScheduleParents?.parentsName;
  const scheduleList = todayScheduleParents?.scheduleList;

  return { parentsName, scheduleList };
}
