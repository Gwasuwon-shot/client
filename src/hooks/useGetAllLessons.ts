import { useQuery } from "react-query";

import { getLessonByTeacher } from "../api/getLessonByTeacher";

export default function useGetAllLessons() {
  //   api 패칭
  const { data: lessonList } = useQuery(["lessonByTeacher"], getLessonByTeacher, {
    onError: (err) => {
      console.log(err);
    },
  });

  return { lessonList };
}
