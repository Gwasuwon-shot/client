import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TosCheckedSignupIc } from "../assets";
import { studentNameState, subjectNameState } from "../atom/common/datePicker";
import { dateState, dayState } from "../atom/timePicker/timePicker";
import ButtonLayout from "../components/welcomeSignup/ButtonLayout";
import { STUDENT_COLOR } from "../core/common/studentColor";

export default function LessonRegisterComplete() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useRecoilState<string>(studentNameState);
  const [subject, setSubject] = useRecoilState<string>(subjectNameState);
  const [startDate, setStartDate] = useRecoilState(dateState);
  const [regularScheduleList, setRegularScheduleList] = useRecoilState(dayState);

  function onHandleNavigate(path: string) {
    navigate(path);
    // resetAllStates();
  }

  return (
    <ConfirmWrapper>
      <CenterWrapper>
        <TosCheckedSignupIcon />
        <CompleteText>수업 등록 완료!</CompleteText>
      </CenterWrapper>
      <CenterWrapper>
        <ModalTime>
          {startDate.year}년 {startDate.month}월 {startDate.date}일 {regularScheduleList[0].dayOfWeek}
        </ModalTime>
        <ScheduleContainer>
          <ModalName>
            <span>{studentName}</span> 학생
          </ModalName>
          {/* TODO 맞는 컬러칩 넣기 */}
          <ModalSubject $backgroundcolor={STUDENT_COLOR[2354 % 10]}>{subject}</ModalSubject>
        </ScheduleContainer>
      </CenterWrapper>
      <ButtonLayout
        buttonText="학부모님과 함께 관리하기"
        passText="건너뛰고 혼자 관리하기"
        onClickButton={() => onHandleNavigate("/lesson-share")}
        onClickJump={() => onHandleNavigate("/home")}
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

const TosCheckedSignupIcon = styled(TosCheckedSignupIc)`
  width: 8.7rem;
  height: 8.7rem;
  text-align: center;
`;
