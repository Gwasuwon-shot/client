import { useQuery } from "react-query";
import { getTodayScheduleByTeacher } from "../api/getTodayScheduleByTeacher";

export default function useGetTodayScheduleByTeacher() {
  // 선생님 : 메인페이지 뷰 (홈)- 배너(가장 가까운 수업)
  //   api 패칭
  const { data: todayScheduleByTeacher } = useQuery(["todayScheduleByTeacher"], getTodayScheduleByTeacher, {
    onError: (error) => {
      console.log(error);
    },
  });

  // // const teacherName = todayScheduleByTeacher?.teacherName;
  // const isTodaySchedule = todayScheduleByTeacher?.isTodaySchedule;
  // const todaySchedule = todayScheduleByTeacher?.todaySchedule;
  // const isMissingAttendanceByLesson = todaySchedule?.isMissingAttendanceByLesson;

  const { lesson, timeStatus, schedule } =
    todayScheduleByTeacher !== null && todayScheduleByTeacher !== undefined && todayScheduleByTeacher;

  return { todayScheduleByTeacher, lesson, timeStatus, schedule };
}
