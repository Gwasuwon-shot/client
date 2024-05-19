import { useQuery } from "react-query";
import { getLatestScheduleByTeacher } from "../api/getLatestScheduleByTeacher";

export default function useGetLatestScheduleByTeacher() {
  // 선생님 : 메인페이지 뷰 (홈)- 오늘의 수업/곧 다가오는 수업
  //   api 패칭
  const { data: latestScheduleByTeacher } = useQuery(["latestScheduleByTeacher"], getLatestScheduleByTeacher, {
    onError: (error) => {
      console.log(error);
    },
  });

  const isMissingAttendance = latestScheduleByTeacher?.isMissingAttendance;
  const isMissingMaintenance = latestScheduleByTeacher?.isMissingMaintenance;
  const isTodaySchedule = latestScheduleByTeacher?.isTodaySchedule;
  const latestScheduleDay = latestScheduleByTeacher?.latestScheduleDay;
  const latestScheduleList = latestScheduleByTeacher?.latestScheduleList;

  return {
    latestScheduleByTeacher,
    isMissingAttendance,
    isMissingMaintenance,
    isTodaySchedule,
    latestScheduleDay,
    latestScheduleList,
  };
}
