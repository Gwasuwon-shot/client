import { useQuery } from "react-query";

import { getPaymentRecordByLesson } from "../api/getPaymentRecordByLesson";

export default function useGetPaymentRecordByLesson(lessonIdx: number) {
  const { data: payments } = useQuery(["getPaymentRecordByLesson"], () => getPaymentRecordByLesson(lessonIdx), {
    onError: (error) => {
      console.log(error);
    },
  });

  return { payments };
}
