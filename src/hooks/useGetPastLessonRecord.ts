import { useQuery } from "react-query";
import { getPastLessonRecord } from "../api/getPastLessonRecord";
import { PastLessonRecordType } from "../type/lessonRecord/lessonRecord";

export default function useGetPastLessonRecord(lessonId: number) {
  const { data: pastLessonRecord } = useQuery(["getPastLessonRecord"], () => getPastLessonRecord(lessonId), {});

  const scheduleList = pastLessonRecord?.scheduleList?.filter(
    (item: PastLessonRecordType) => item.status !== "수업예정",
  );
  const lesson = pastLessonRecord?.lesson;

  return { scheduleList, lesson };
}
