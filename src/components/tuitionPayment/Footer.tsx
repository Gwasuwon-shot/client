import { useNavigate } from "react-router-dom";
import {
  accountNumber,
  bankName,
  lessonCodeAndPaymentId,
  moneyAmount,
  paymentOrder,
} from "../../atom/tuitionPayment/tuitionPayment";

import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { studentNameState, subjectNameState } from "../../atom/common/datePicker";
import { cycleNumberState, dateState, dayState } from "../../atom/timePicker/timePicker";
import { useMutation } from "react-query";
import { createLesson } from "../../api/createLesson";

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

export default function Footer() {
  const navigate = useNavigate();

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

  const { mutate: createNewLesson } = useMutation(createLesson, {
    onSuccess: (response) => {
      setCodeAndId(response);
      navigate("/lesson-connect");
    },
    onError: (error: any) => {
      if (error.response.data.message === "은행 값이 유효하지 않습니다.") {
        alert("유효하지 않은 은행 값입니다. 관리자에게 문의 바랍니다.");
      }
    },
    useErrorBoundary: false,
  });

  function handlePostLesson(info: createLessonProps) {
    createNewLesson(info);
  }

  const postStartDate =
    String(startDate.year) +
    "-" +
    String(startDate.month).padStart(2, "0") +
    "-" +
    String(startDate.date).padStart(2, "0");

  const postInformation = {
    lesson: {
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

  const isFooterGreen = number !== "" && bank !== "" && amount !== 0 && payment !== "";

  return (
    <FooterWrapper>
      <FooterButtonWrapper $isFooterGreen={isFooterGreen} onClick={() => handlePostLesson(postInformation)}>
        <FooterButton $isFooterGreen={isFooterGreen}> 다음 </FooterButton>
      </FooterButtonWrapper>
    </FooterWrapper>
  );
}

interface isFooterGreenProps {
  $isFooterGreen: boolean;
}

const FooterWrapper = styled.div`
  height: 9rem;
`;

const FooterButtonWrapper = styled.footer<isFooterGreenProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;

  width: 32rem;
  height: 6.3rem;
  padding: 0.8rem;

  ${({ theme, $isFooterGreen }) =>
    $isFooterGreen ? `background-color: ${theme.colors.green5};` : `background-color: ${theme.colors.grey50};`}
`;

const FooterButton = styled.button<isFooterGreenProps>`
  display: flex;

  ${({ theme }) => theme.fonts.body02};
  ${({ theme, $isFooterGreen }) =>
    $isFooterGreen ? `color: ${theme.colors.grey0};` : `color: ${theme.colors.grey200};`}
`;
