import { useQuery } from "react-query";
import { getPaymentRecordView } from "../api/getPaymentRecordView";

export default function useGetPaymentRecordView(paymentRecordIdx: number) {
  const { data: paymentRecordView } = useQuery(["getPaymentRecordView"], () => getPaymentRecordView(paymentRecordIdx), {
    onError: (error) => {
      console.log(error);
    },
  });

  const lesson = paymentRecordView?.lesson;
  const paymentDate = paymentRecordView?.paymentDate;
  const cycle = lesson?.cycle;
  const endDate = cycle?.endDate;
  const startDate = cycle?.startDate;
  const value = cycle?.value;
  const idx = lesson?.idx;
  const studentName = lesson?.studentName;
  const subject = lesson?.subject;

  return { lesson, paymentDate, cycle, endDate, startDate, value, idx, studentName, subject };
}
