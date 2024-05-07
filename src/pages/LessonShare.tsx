import { useEffect, useState } from "react";
import { CopyLessonShareIc, ShareViaEtc, ShareViaKakao, ShareViaMessage } from "../assets";
import { studentNameState, subjectNameState } from "../atom/common/datePicker";
import { cycleNumberState, dateState, dayState, firstLessonDay, focusDayState } from "../atom/timePicker/timePicker";
import {
  accountNumber,
  bankName,
  moneyAmount,
  payingPersonName,
  paymentOrder,
} from "../atom/tuitionPayment/tuitionPayment";

import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { lessonCodeAndPaymentId } from "../atom/tuitionPayment/tuitionPayment";
import { CommonBackButton, ProgressBar } from "../components/common";
import BottomButton from "../components/common/BottomButton";
import useGetLessonByUser from "../hooks/useGetLessonByUser";

interface dayProps {
  year: number;
  month: number;
  date: number;
}

interface Day {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export default function LessonShare() {
  //이 앞 Tuition에서 넘어왔는지 확인하는 값
  // https://github.com/Gwasuwon-shot/Tutice_Client/blob/release1.1/src/components/tuitionPayment/Footer.tsx
  // const { state } = useLocation();
  const [state, _] = useState(true);
  const { userName } = useGetLessonByUser();

  const [cycleNumber, setCycleNumberState] = useRecoilState(cycleNumberState);
  const [date, setdateState] = useRecoilState(dateState);
  const [day, setDayState] = useRecoilState(dayState);
  const [firstLesson, setFirstLessonDay] = useRecoilState(firstLessonDay);
  const [focusDay, setFocusDayState] = useRecoilState(focusDayState);
  const [studentName, setStudentName] = useRecoilState<string>(studentNameState);
  const [subjectName, setSubjectNameState] = useRecoilState(subjectNameState);
  const [accountNum, setAccountNumber] = useRecoilState(accountNumber);
  const [bank, setBankName] = useRecoilState(bankName);
  const [money, setMoneyAmount] = useRecoilState(moneyAmount);
  const [payingPerson, setPayingPersonName] = useRecoilState(payingPersonName);
  const [payment, setPaymentOrder] = useRecoilState(paymentOrder);

  function setAllSet() {
    setCycleNumberState(-1);
    setdateState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate() });
    setDayState([]);
    setFirstLessonDay({ 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토", 0: "일" }[new Date().getDay()]);

    setStudentName("");
    setSubjectNameState("");
    setAccountNumber("");
    setBankName("");
    setMoneyAmount(0);
    setPayingPersonName("");
  }

  const navigate = useNavigate();
  const codeAndId = useRecoilValue(lessonCodeAndPaymentId);
  const [URL, setURL] = useState(`https://tutice.com/${codeAndId?.lessonCode}`);

  useEffect(() => {
    setURL(`https://tutice.com/${codeAndId?.lessonCode}`);
  }, [codeAndId]);

  function handleMoveToHome() {
    setAllSet();
    navigate("/home");
    // recoil 값 모두 초기값으로 변경
  }

  function handleShareOtherWays() {
    if (navigator.share) {
      navigator.share({
        title: "수업링크 공유",
        text: `안녕하세요, 과외 수업 관리 필수 앱 Tutice 입니다. \n\n[${userName}]선생님이 [${studentName}]학생의\nTutice 초대장을 보냈습니다.\n\nTutice 링크 \n ${URL}`,

        url: URL,
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  }

  function handleCopyLink() {
    try {
      navigator.clipboard.writeText(URL).then(() => {
        alert("클립보드에 링크가 복사되었어요.");
      });
    } catch (err) {
      alert("링크 복사에 실패했습니다");
    }
  }

  return (
    <>
      {state ? (
        <LessonTreeSuccess>수업 관리 연동</LessonTreeSuccess>
      ) : (
        <OnlyLessonShareHeader>
          <BackButtonWrapper>
            <CommonBackButton />
          </BackButtonWrapper>
          <LessonTreeSuccess>수업링크 공유</LessonTreeSuccess>
        </OnlyLessonShareHeader>
      )}

      {state && <ProgressBar progress={100} />}
      <LessonShareWrapper>
        <ShareTitle>튜티스 초대 링크를 공유해주세요</ShareTitle>
        <ShareSub>
          학부모님과의 수업 연동을 통해 <br /> 입금 및 수업 관리를 한 번에 할 수 있어요.
        </ShareSub>

        <LinkBox>
          <CopyLessonShareIc onClick={handleCopyLink} />
          <p>{URL}</p>
        </LinkBox>

        <ShareContainer>
          {SHARE_ICON.map(({ icon }) => (
            <ShareIcon as={icon} />
          ))}
        </ShareContainer>

        <ButtonTextWrapper>
          <ButtonText>나중에 할게요</ButtonText>
          <ButtonText>초대장 미리보기</ButtonText>
        </ButtonTextWrapper>

        {state && (
          <BottomButtonWrapper>
            <BottomButton isActive={true} onClick={handleMoveToHome} disabled={false} type="button">
              공유햇어요
            </BottomButton>
          </BottomButtonWrapper>
        )}
      </LessonShareWrapper>
    </>
  );
}

const SHARE_ICON = [
  { icon: ShareViaKakao, text: "카카오톡" },
  { icon: ShareViaMessage, text: "메시지" },
  { icon: ShareViaEtc, text: "기타" },
];

const BackButtonWrapper = styled.div`
  position: absolute;
`;

const OnlyLessonShareHeader = styled.header`
  display: flex;
`;

const BottomButtonWrapper = styled.section`
  margin-left: -1.4rem;
`;

const LessonTreeSuccess = styled.p<{ onlyLessonShare?: boolean }>`
  /* padding: ${({ onlyLessonShare }) => (onlyLessonShare ? "1.2rem 12.1rem 1.2rem 8.6rem" : "1.2rem 12.1rem")}; */
  padding: 1.2rem 0;

  text-align: center;

  ${({ theme }) => theme.fonts.body01};
`;

const LessonShareWrapper = styled.section`
  margin-top: 2.4rem;
  padding: 0 1.4rem;
`;

const ShareTitle = styled.h1`
  margin-top: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title01};
`;

const ShareSub = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body06};
`;

const LinkBox = styled.label`
  margin-top: 2.5rem;
  display: flex;
  width: 100%;
  height: 4.6rem;
  padding: 0.8rem 1.5rem;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
  margin-top: 6rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.green1};

  color: ${({ theme }) => theme.colors.grey700};
  ${({ theme }) => theme.fonts.body02};
`;

const ShareIcon = styled.div`
  width: 9.2rem;
  height: 6.4rem;
`;

const ShareContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 3rem;
  gap: 0.8rem;
`;

const ButtonTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonText = styled.button`
  width: fit-content;
  margin-top: 1.6rem;
  ${({ theme }) => theme.fonts.body04};

  color: ${({ theme }) => theme.colors.grey500};

  border-bottom: solid 0.05rem ${({ theme }) => theme.colors.grey500};
`;
