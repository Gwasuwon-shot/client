import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { createLesson } from "../../api/createLesson";
import { studentNameState, subjectNameState } from "../../atom/common/datePicker";
import { parentsPhoneState } from "../../atom/registerLesson/registerLesson";
import { cycleNumberState, dateState, dayState } from "../../atom/timePicker/timePicker";
import {
  accountNumber,
  bankName,
  lessonCodeAndPaymentId,
  moneyAmount,
  paymentOrder,
} from "../../atom/tuitionPayment/tuitionPayment";
import { BUTTON_TEXT } from "../../core/signup/signUpTextLabels";
import useFormattedPhoneNumber from "../../hooks/signupLogin/usePhoneNumberFormat";
import useModal from "../../hooks/useModal";
import { BasicDoubleModal, BottomButton, CommonBackButton, ProgressBar } from "../common";
import InputLayout from "../signup/InputLayout";
import SignupTitleLayout from "../signup/SignupTitleLayout";

interface scheduleListProps {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface createLessonProps {
  lesson: {
    studentName: string;
    subject: string;
    payment: string;
    amount: number;
    count: number;
    startDate: string;
    regularScheduleList: scheduleListProps[];
  };
  account: {
    bank: string;
    number: string;
  };
}

export default function LessonConnectNumber() {
  const studentName = useRecoilValue<string>(studentNameState);
  const subject = useRecoilValue<string>(subjectNameState);
  const payment = useRecoilValue<string>(paymentOrder);
  const amount = useRecoilValue<number>(moneyAmount);
  const count = useRecoilValue<number>(cycleNumberState);
  const startDate = useRecoilValue(dateState);
  const regularScheduleList = useRecoilValue(dayState);
  const bank = useRecoilValue(bankName);
  const number = useRecoilValue(accountNumber);
  const setCodeAndId = useSetRecoilState(lessonCodeAndPaymentId);

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useFormattedPhoneNumber();
  const [parentsPhone, setParentPhone] = useRecoilState(parentsPhoneState);

  const { showModal, unShowModal, openModal } = useModal();

  const postStartDate =
    String(startDate.year) +
    "-" +
    String(startDate.month).padStart(2, "0") +
    "-" +
    String(startDate.date).padStart(2, "0");

  // post 할 데이터 구조로 만들기
  const postInformation = {
    lesson: {
      parentsPhone: parentsPhone,
      studentName: studentName,
      subject: subject,
      payment: payment,
      amount: Number(amount),
      count: count,
      startDate: postStartDate,
      regularScheduleList: regularScheduleList,
    },
    account: {
      bank: bank,
      number: number,
    },
  };

  function handleMoveToLessonShare() {
    navigate("/register-complete", { state: true });
  }

  const { mutate: createNewLesson } = useMutation(createLesson, {
    onSuccess: (response) => {
      // setLessonData(postInformation);
      setCodeAndId(response);
      //setStartDate(response); //-> 지수에 전달한 data recoil 저장
      handleMoveToLessonShare();
    },
    onError: (error: any) => {
      if (error.response.data.message === "은행 값이 유효하지 않습니다.") {
        alert("유효하지 않은 은행 값입니다. 관리자에게 문의 바랍니다.");
      }
    },
    useErrorBoundary: false,
  });

  function PostLessonInformation(info: createLessonProps) {
    createNewLesson(info);
  }

  function handleClickNext() {
    showModal();
  }

  function handleClickOK() {
    PostLessonInformation(postInformation);
  }

  function handleChangeNumber(value: string) {
    setPhoneNumber(value);
    setIsActive(true);
    setParentPhone(phoneNumber.replace(/\D+/g, ""));
  }

  return (
    <>
      {openModal && (
        <BasicDoubleModal
          leftButtonName="취소"
          rightButtonName="확인"
          handleClickLeftButton={() => {
            unShowModal();
          }}
          handleClickRightButton={() => handleClickOK()}>
          {phoneNumber} <br /> 이 번호가 맞나요?
        </BasicDoubleModal>
      )}
      <Header></Header>
      <CommonBackButton />
      <ProgressBar progress={50} />
      <Container>
        <SignupTitleLayout>
          과외 수업 관리를 위해 <br />
          연동할 휴대폰 번호를 입력해주세요
        </SignupTitleLayout>
        <InputNotice>
          앱 PUSH 알림을 받으실 <br /> 학부모님의 전화번호를 입력해주세요
        </InputNotice>
        <InputLayout
          type="tel"
          labelText="휴대폰 번호"
          placeholder="번호 ‘-’ 제외하고 입력"
          onInputChange={handleChangeNumber}
        />
      </Container>
      <BottomButton type="button" disabled={!isActive} isActive={isActive} onClick={handleClickNext}>
        {BUTTON_TEXT.next}
      </BottomButton>
    </>
  );
}

const Header = styled.header`
  margin-top: 2rem;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;

  padding-left: 1.6rem;
  margin-top: 2.8rem;
`;

const InputNotice = styled.h2`
  display: flex;

  margin-top: 0.8rem;

  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;
