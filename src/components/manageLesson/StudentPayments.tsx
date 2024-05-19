import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isModalOpen } from "../../atom/common/isModalOpen";
import { isSnackBarOpen } from "../../atom/common/isSnackBarOpen";
import { paymentSuccessSnackBar } from "../../atom/registerPayment/registerPayment";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useGetLessonDetail from "../../hooks/useGetLessonDetail";
import useGetPaymentRecordByLesson from "../../hooks/useGetPaymentRecordByLesson";
import useGetTodayDate from "../../hooks/useGetTodayDate";
import { PaymentRecordType } from "../../type/manageLesson/paymentRecordType";
import SuccessSendingAlarmSnackBar from "../common/SuccessSendingAlarmSnackBar";
import HarvestFruiteSnackBar from "../modal/HarvestFruiteSnackBar";
import SendPaymentAlarmManageLessonModal from "./SendPaymentAlarmManageLessonModal";
import StudentPayment from "./StudentPayment";

export default function StudentPayments() {
  const { manageLessonId } = useParams();
  const { payments } = useGetPaymentRecordByLesson(Number(manageLessonId)); //lessonIdx 넣어주어야함
  const { todayDate } = useGetTodayDate();
  const { idx, studentName, subject } = useGetLessonDetail(Number(manageLessonId));
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [payMentAlarmOpen, setPayMentAlarmOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useRecoilState(isSnackBarOpen);
  const [successPay, setSuccessPay] = useRecoilState(paymentSuccessSnackBar);

  function checkRealDate(date: string | null) {
    return date !== null ? date : todayDate?.date;
  }

  return (
    <>
      <SnackBarWrapper>
        {snackBarOpen && !successPay?.isOpen && <SuccessSendingAlarmSnackBar />}
        {snackBarOpen && successPay?.isOpen && <HarvestFruiteSnackBar count={successPay?.count} />}
      </SnackBarWrapper>
      {openModal && payMentAlarmOpen && (
        <ModalWrapper>
          <SendPaymentAlarmManageLessonModal
            studentName={studentName}
            subject={subject}
            backgroundColor={STUDENT_COLOR[idx % 10]}
            color="#757A80"
            isBig={false}
            lessonIdx={idx}
          />
        </ModalWrapper>
      )}
      <StudentPaymentsWrapper>
        {payments?.map(({ idx, date, amount, status }: PaymentRecordType, index: number) => (
          <StudentPayment
            key={idx}
            idx={idx}
            date={checkRealDate(date)}
            amount={amount}
            status={status}
            count={Math.abs(index - payments.length)}
            setPayMentAlarmOpen={setPayMentAlarmOpen}
          />
        ))}
      </StudentPaymentsWrapper>
    </>
  );
}

const SnackBarWrapper = styled.div`
  margin-left: -1.4rem;
`;

const StudentPaymentsWrapper = styled.section`
  margin-top: 1.6rem;
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 2;
  height: 100vh;
`;
