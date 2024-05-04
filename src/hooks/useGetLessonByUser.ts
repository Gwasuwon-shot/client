import { useQuery } from "react-query";
import { getCookie } from "../api/cookie";
import { getLessonByUser } from "../api/getLessonByUser";

export default function useGetLessonByUser() {
  const { data } = useQuery(["getLessonByUser"], getLessonByUser, {
    onError: (error) => {
      console.log(getCookie("accessToken"));
      console.log(error);
    },
  });
  const isLesson = data?.isLesson;
  const userName = data?.userName;

  return { isLesson, userName };
}
