import { useEffect, useState } from "react";
import { ScheduleListType } from "../../type/manageLesson/scheduleListType";

export default function useOrderedSchedules(cancelScheduleList: ScheduleListType[], scheduleList: ScheduleListType) {
  const [combinedClasses, setCombinedClasses] = useState<ScheduleListType[]>([]);
  const [orderedSchedules, setOrderedSchedules] = useState<number[]>([]);

  useEffect(() => {
    const combined = cancelScheduleList
      .concat(scheduleList)
      .sort((a: ScheduleListType, b: ScheduleListType) => b.idx - a.idx);
    setCombinedClasses(combined);
    setOrderedSchedules(processAndOrderSchedules(combined));
  }, [cancelScheduleList, scheduleList]);

  return { orderedSchedules, combinedClasses };
}

function processAndOrderSchedules(schedules: ScheduleListType[]) {
  const totalNonCanceled = schedules.reduce((acc, schedule) => {
    return acc + (schedule.status !== "취소" ? 1 : 0);
  }, 0);

  let currentOrder = totalNonCanceled;
  return schedules.map((schedule) => {
    if (schedule.status !== "취소") {
      return currentOrder--;
    }
    return 0;
  });
}
