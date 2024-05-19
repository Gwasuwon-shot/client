import { useQuery } from "react-query";
import { getLessonDetail } from "../api/getLessonDetail";

export default function useGetLessonDetail(lessonIdx: number) {
  const { data: lessonDetail } = useQuery(["getLessonDetail", lessonIdx], () => getLessonDetail(lessonIdx), {
    onError: (error) => {
      console.log(error);
    },
  });

  const { amount, idx, payment, startDate, studentName, subject, teacherName, lessonCode } =
    lessonDetail !== undefined && lessonDetail;

  return { amount, idx, payment, startDate, studentName, subject, teacherName, lessonCode };
}
