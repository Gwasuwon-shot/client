import { useQuery } from "react-query";

import { getLessonAccount } from "../api/getLessonAccount";

export default function useGetLessonAccount(lessonIdx: number) {
  const { data: accountInfo } = useQuery(["useGetLessonAccount", lessonIdx], () => getLessonAccount(lessonIdx), {});

  return { accountInfo };
}
