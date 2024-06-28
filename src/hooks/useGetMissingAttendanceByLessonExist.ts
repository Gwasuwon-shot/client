import { useQuery } from "react-query";

import { getMissingAttendanceByLessonExist } from "../api/getMissingAttendanceByLessonExist";

export default function useGetMissingAttendanceByLessonExist(lessonIdx: number) {
  const { data: isMissingAttendanceByLesson } = useQuery(
    ["getMissingAttendanceByLessonExist"],
    () => getMissingAttendanceByLessonExist(lessonIdx),
    {
      onError: (err) => {
        console.log(err);
      },
    },
  );

  return { isMissingAttendanceByLesson };
}
