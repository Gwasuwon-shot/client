import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { updatePaymentRecord } from "../api/updatePaymentRecord";
import { EditPaymentIc, FruitPaymentIc } from "../assets";
import { managingStatus } from "../atom/mangeLesson/managingStatus";
import {
  openPaymentPicker,
  paymentDateState,
  paymentSuccessSnackBar,
} from "../atom/registerPayment/registerPayment";
import RoundBottomMiniButton from "../components/common/RoundBottomMiniButton";
import StudentNameLabel from "../components/common/StudentNameLabel";
import PaymentDatePicker from "../components/registerPayment/PaymentDatePicker";
import { STUDENT_COLOR } from "../core/common/studentColor";
import { MANAGE_LESSON_STATUS } from "../core/manageLesson/manageLessonStatus";
import useGetLessonDetail from "../hooks/useGetLessonDetail";
import useGetPaymentRecordCycle from "../hooks/useGetPaymentRecordCycle";

export default function RegisterPayment() {
  const { state } = useLocation(); // paymentIdx
  const { manageLessonId } = useParams(); // lessonIdx
  const { studentName, subject } = useGetLessonDetail(Number(manageLessonId));
  // const [student, setStudentName] = useRecoilState<string>(studentNameState);
  // const [subjectName, setSubjectName] = useRecoilState<string>(subjectNameState);
  const { idx, cycle, startDate, endDate } = useGetPaymentRecordCycle(
    Number(state?.paymentIdx)
  );
  const [successPay, setSuccessPay] = useRecoilState(paymentSuccessSnackBar);
  const [isOpenPicker, setIsOpenPicker] = useRecoilState(openPaymentPicker);
  const [activeDateSlide, setActiveDateSlide] = useRecoilState(
    paymentDateState
  );
  const navigate = useNavigate();
  const [status, setStatus] = useRecoilState(managingStatus);

  function handleGoBack() {
    navigate(-1);
  }

  const queryClient = useQueryClient();

  const { mutate: registerPay } = useMutation(updatePaymentRecord, {
    onSuccess: () => {
      setSuccessPay({ isOpen: true, count: state?.count });
      setStatus(MANAGE_LESSON_STATUS.payment);
      queryClient.invalidateQueries("getPaymentRecordByLesson");
      navigate(`/manage-lesson/${manageLessonId}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleReadyToRegister() {
    registerPay({
      paymentRecordIdx: state?.paymentIdx,
      paymentDate: checkDate(),
    });
  }

  function checkMonthDay(dates: number) {
    if (dates / 10 < 1) {
      return "0" + `${dates}`;
    } 
      return `${dates}`;
    
  }

  function checkDate(): string {
    return (
      `${activeDateSlide?.year}` +
      `-${ 
      checkMonthDay(activeDateSlide?.month) 
      }-${ 
      checkMonthDay(activeDateSlide?.date)}`
    );
  }

  function handleOpenPicker() {
    setIsOpenPicker(true);
  }

  return (
    <RegisterPaymentWrapper>
        <Title>입금일 등록</Title>
        <StudentNameLabel
          studentName={studentName}
          subject={subject}
          backgroundColor={STUDENT_COLOR[idx % 10]}
          color="#757A80"
          isBig
        />
        <FruitWrapper>
          <FruitPaymentIcon />
          <Count>{state?.count}번째 결실</Count>
          <LessonDate>
            {new Date(startDate).getMonth() + 1}.{new Date(startDate).getDate()}
            ~{new Date(endDate).getMonth() + 1}.{new Date(endDate).getDate()}
          </LessonDate>
        </FruitWrapper>
        <Sub>입금일</Sub>
        <PaymentDate>
          {activeDateSlide.month}월 {activeDateSlide.date}일
          <EditPaymentIcon onClick={handleOpenPicker} />
        </PaymentDate>
        <ButtonWrapper>
          <RoundBottomMiniButton isGreen={false} onClick={handleGoBack}>
            취소
          </RoundBottomMiniButton>
          <RoundBottomMiniButton isGreen onClick={handleReadyToRegister}>
            등록하기
          </RoundBottomMiniButton>
        </ButtonWrapper>
        {isOpenPicker && (
          <ModalWrapper>
            <PaymentDatePicker />
          </ModalWrapper>
        )}
      </RegisterPaymentWrapper>
  );
}

const Title = styled.h1`
  margin-top: 0.5rem;
  margin-bottom: 1.78rem;

  text-align: center;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title03};
`;

const RegisterPaymentWrapper = styled.section`
  /* display: flex;
  justify-content: center; */
  padding: 0 1.8rem;
`;

const FruitPaymentIcon = styled(FruitPaymentIc)`
  width: 7.4rem;
`;

const FruitWrapper = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 2.13rem;
  margin-bottom: 1.8rem;
`;

const Count = styled.h1`
  margin-top: 0.8rem;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title03};
`;

const LessonDate = styled.p`
  margin-top: 0.5rem;

  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body05};
`;

const Sub = styled.h2`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title02};
`;

const PaymentDate = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 2.2rem;

  width: 28.5rem;
`;

const EditPaymentIcon = styled(EditPaymentIc)`
  width: 5rem;
  height: 5rem;
`;

const ModalWrapper = styled.div`
  margin-left: -1.8rem;
`;
