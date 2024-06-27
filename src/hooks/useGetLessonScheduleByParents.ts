import { useQuery } from "react-query";

import { getLessonScheduleByParents } from "../api/getLessonScheduleByParents";

export default function useGetLessonScheduleByParents(lessonIdx: number) {
  const { data: lessonScheduleByParents } = useQuery(
    ["lessonScheduleByParents"],
    () => getLessonScheduleByParents(lessonIdx),
    {
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const lesson = lessonScheduleByParents?.lesson;
  const scheduleList = lessonScheduleByParents?.scheduleList;
  const idx = lesson?.idx;
  const count = lesson?.count;
  const nowCount = lesson?.nowCount;
  const percent = lesson?.percent;
  const studentName = lesson?.studentName;
  const teacherName = lesson?.teacherName;
  const subject = lesson?.subject;

  return { lesson, scheduleList, idx, count, nowCount, percent, studentName, teacherName, subject };
}
