import { useQuery } from "react-query";
import { getLessonRegularSchedule } from "../api/getLessonRegularSchedule";

export default function useGetLessonRegularSchedule(lessonIdx: number) {
  const { data: lessonRegularSchedule } = useQuery(
    ["lessonRegularSchedule"],
    () => getLessonRegularSchedule(lessonIdx),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { lessonRegularSchedule };
}
