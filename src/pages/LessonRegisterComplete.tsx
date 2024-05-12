import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CheckLargeIcon } from "../assets";
import { studentNameState, subjectNameState } from "../atom/common/datePicker";
import { dateState, dayState } from "../atom/timePicker/timePicker";
import ButtonLayout from "../components/welcomeSignup/ButtonLayout";
import { STUDENT_COLOR } from "../core/common/studentColor";

import REACTGA from "react-ga4";

export default function LessonRegisterComplete() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useRecoilState<string>(studentNameState);
  const [subject, setSubject] = useRecoilState<string>(subjectNameState);
  const [startDate, setStartDate] = useRecoilState(dateState);
  const [regularScheduleList, setRegularScheduleList] = useRecoilState(dayState);

  console.log(regularScheduleList);

  function onHandleNavigate(path: string) {
    navigate(path);
  }

  function onClickShareButton() {
    onHandleNavigate("/lesson-share");
    REACTGA.event({
      category: "학부모와 함께 관리",
      action: "Click",
    });
  }

  function onClickJumpButton() {
    onHandleNavigate("/home");
    REACTGA.event({
      category: "건너뛰고 혼자 관리",
      action: "Click",
    });
  }

  return (
    <>
      <ConfirmWrapper>
        <CenterWrapper>
          <LargeCheckIcon />
          <CompleteText>수업 등록 완료!</CompleteText>
        </CenterWrapper>
        <CenterWrapper>
          <ScheduleContainer>
            <ModalName>
              <span>{studentName}박송현</span> 학생
            </ModalName>
            <ModalSubject $backgroundcolor={STUDENT_COLOR[2354 % 10]}>{subject}과목</ModalSubject>
          </ScheduleContainer>
          <ScheduleContainer>
            {regularScheduleList.map((schedule) => (
              <Fragment key={schedule.dayOfWeek}>
                <DayOfWeekCircle>월</DayOfWeekCircle>
                <ModalTime>
                  {schedule.startTime} - {schedule.startTime}
                </ModalTime>
              </Fragment>
            ))}
          </ScheduleContainer>
        </CenterWrapper>
      </ConfirmWrapper>
      <ButtonWrapper>
        <ButtonLayout
          buttonText="학부모님과 함께 관리하기"
          passText="건너뛰고 혼자 관리하기"
          onClickButton={() => onClickShareButton()}
          onClickJump={() => onClickJumpButton()}
        />
      </ButtonWrapper>
    </>
  );
}

const ConfirmWrapper = styled.div`
  display: flex;
  height: 90vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  gap: 0.9rem;
`;

const CenterWrapper = styled.div`
  text-align: center;
`;

const ModalTime = styled.p`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey900};
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
  margin-bottom: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.green5};
  ${({ theme }) => theme.fonts.title01};
`;

const LargeCheckIcon = styled(CheckLargeIcon)`
  width: 8.7rem;
  height: 8.7rem;
  text-align: center;
`;

const DayOfWeekCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  border-radius: 50%;
  color: ${({ theme }) => theme.colors.green5};
  background-color: ${({ theme }) => theme.colors.green1};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;
