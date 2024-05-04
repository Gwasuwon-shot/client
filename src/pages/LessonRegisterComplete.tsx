import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TosCheckedSignupIc } from "../assets";
import { lessonCodeAndPaymentId, lessonInputData } from "../atom/tuitionPayment/tuitionPayment";
import ButtonLayout from "../components/welcomeSignup/ButtonLayout";
import { STUDENT_COLOR } from "../core/common/studentColor";

export default function LessonRegisterComplete() {
  const navigate = useNavigate();
  const lessonData = useRecoilValue(lessonInputData);
  const codeAndId = useRecoilValue(lessonCodeAndPaymentId);
  function handleMoveToIntegration() {}
  return (
    <ConfirmWrapper>
      <CenterWrapper>
        <TosCheckedSignupIc style={{ width: "8.7rem", height: "8.7rem", textAlign: "center" }} />
        <CompleteText>수업 등록 완료!</CompleteText>
      </CenterWrapper>
      <CenterWrapper>
        <ModalTime>2023년 7월 3일 (월)</ModalTime>
        <ScheduleContainer>
          <ModalName>
            <span>박송현</span> 학생
          </ModalName>
          <ModalSubject $backgroundcolor={STUDENT_COLOR[12 % 10]}>수학</ModalSubject>
        </ScheduleContainer>
      </CenterWrapper>
      <ButtonLayout
        buttonText="학부모님과 함께 관리하기"
        passText="건너뛰고 혼자 관리하기"
        // TODO 학부모님과 함께 관리하기 버튼 클릭 시 학부모님과 함께 관리하기 페이지로 이동
        onClickJump={() => navigate("/home")}
        onClickButton={() => navigate("/home")}
      />
    </ConfirmWrapper>
  );
}

const ConfirmWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9rem;
`;

const CenterWrapper = styled.div`
  text-align: center;
`;

const ModalTime = styled.p`
  ${({ theme }) => theme.fonts.body07};
  color: ${({ theme }) => theme.colors.grey300};
`;

const ModalName = styled.span`
  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey900};
  > span {
    ${({ theme }) => theme.fonts.title02};
  }
`;

const ModalSubject = styled.span<{ $backgroundcolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1.6rem;
  padding: 0.2rem 0.6rem;

  background-color: ${(props) => props.$backgroundcolor};
  ${({ theme }) => theme.fonts.caption01};
  color: ${({ theme }) => theme.colors.grey500};
  border-radius: 0.8rem;
`;

const CompleteText = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.green5};
  ${({ theme }) => theme.fonts.title01};
`;
const DateText = styled.p`
  color: ${({ theme }) => theme.colors.green5};
`;

const NameText = styled.h3`
  color: ${({ theme }) => theme.colors.green5};
`;
