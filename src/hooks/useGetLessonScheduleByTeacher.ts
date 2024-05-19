import { useQuery } from "react-query";
import { getLessonScheduleByTeacher } from "../api/getLessonScheduleByTeacher";

export default function useGetLessonScheduleByTeacher(manageLessonId: number) {
  const { data: lessonScheduleByTeacher } = useQuery(
    ["lessonScheduleByTeacher"],
    () => getLessonScheduleByTeacher(manageLessonId),
    {
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const lesson = lessonScheduleByTeacher?.lesson;
  const scheduleList = lessonScheduleByTeacher?.scheduleList;
  const count = lesson?.count;
  const lessonIdx = lesson?.idx;
  const nowCount = lesson?.nowCount;
  const percent = lesson?.percent;
  const studentName = lesson?.studentName;
  const subject = lesson?.subject;

  return { lesson, lessonIdx, count, nowCount, percent, studentName, subject, scheduleList };
}
