import { useQuery } from "react-query";

import { getLessonProgress } from "../api/getLessonProgress";

export default function useGetLessonProgress(lessonIdx: number) {
  const { data: lessonProgress } = useQuery(["useGetLessonProgress"], () => getLessonProgress(lessonIdx), {
    onError: (error) => {
      console.log(error);
    },
  });

  const { idx, count, nowCount, percent } = lessonProgress !== undefined && lessonProgress;

  return { idx, count, nowCount, percent };
}
