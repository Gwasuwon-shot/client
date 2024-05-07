import { useQuery } from "react-query";
import { getCanceledScheduleByLesson } from "../../api/manageLesson/getCanceledScheduleByLesson";

export default function useGetCanceledScheduleByLesson(lessonIdx: number) {
  const { data: cancelScheduleList } = useQuery(["useGetCanceledScheduleByLesson"], () => getCanceledScheduleByLesson(lessonIdx), {});

  return { cancelScheduleList };
}
