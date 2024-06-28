import { useQuery } from "react-query";

import { getDepositRecord } from "../api/getDepositRecord";

export default function useGetDepositRecord(lessonId: number) {
  const { data: depositRecord } = useQuery(["depositRecord"], () => getDepositRecord(lessonId), {
    onError: (error) => {
      console.error(error);
    },
  });

  const paymentRecordList = depositRecord;

  return {
    paymentRecordList,
  };
}
