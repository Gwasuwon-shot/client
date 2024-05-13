import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import { agreeSend } from "../../atom/common/agreeSend";
import { isSnackBarOpen } from "../../atom/common/isSnackBarOpen";
import { paymentSuccessSnackBar } from "../../atom/registerPayment/registerPayment";
import { paymentOrder } from "../../atom/tuitionPayment/tuitionPayment";
import { TEACHER_FOOTER_CATEGORY } from "../../core/teacherHome/teacherFooter";
import useGetLessonByUser from "../../hooks/useGetLessonByUser";
import useTeacherFooter from "../../hooks/useTeacherFooter";
import { SuccessSendingAlarmSnackBar } from "../common";
import Header from "../common/Header";
import TeacherFooter from "../common/TeacherFooter";
import PrepaymentModal from "../modal/PrepaymentModal";
import NoClassHome from "./NoClassHome";
import YesClassHome from "./YesClassHome";

export default function TeacherHome() {
  const [prepaymentModal, setPreyPaymentModal] = useState<boolean>(false);

  const { isLesson } = useGetLessonByUser();
  const { handleChangeActive } = useTeacherFooter();

  const [payment, setPayment] = useRecoilState(paymentOrder);
  const [isAgreeSend, setIsAgreeSend] = useRecoilState<undefined | string>(agreeSend);
  const setAttendanceData = useSetRecoilState(attendanceStatus);
  const successPay = useRecoilValue(paymentSuccessSnackBar);
  const snackBarOpen = useRecoilValue(isSnackBarOpen);

  useEffect(() => {
    setTimeout(() => {
      setIsAgreeSend(undefined);
    }, 2500);
  }, []);

  useEffect(() => {
    handleChangeActive(TEACHER_FOOTER_CATEGORY.home);
    setAttendanceData({ idx: 0, status: "" });
    if (payment === "선불") {
      setPreyPaymentModal(true);
      setPayment("");
    }
  }, []);

  return (
    <>
      {prepaymentModal && <PrepaymentModal setPreyPaymentModal={setPreyPaymentModal} />}
      {/* 경우의 수에 따라 어떤 스낵바 보일지 로직 짜야함 */}
      {snackBarOpen && (!successPay?.isOpen || isAgreeSend) && <SuccessSendingAlarmSnackBar />}
      {/* {snackBarOpen && <CancelLessonMaintenanceSnackBar />} */}
      <TeacherHomeWrapper>
        <Header />
        {isLesson ? <YesClassHome /> : <NoClassHome />}
      </TeacherHomeWrapper>
      <TeacherFooter />
    </>
  );
}

const TeacherHomeWrapper = styled.div`
  margin: 4rem 1.4rem;
`;
