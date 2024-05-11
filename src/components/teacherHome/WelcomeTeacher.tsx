import { styled } from "styled-components";
import { WELCOME_TEACHER_COMMENTS } from "../../core/teacherHome/welcomeTeacherComments";
import useGetTodayScheduleByTeacher from "../../hooks/useGetTodayScheduleByTeacher";
import useGetTodayScheduleExist from "../../hooks/useGetTodayScheduleExist";
import useGetUserName from "../../hooks/useGetUserName";

export default function WelcomeTeacher() {
  const { todayScheduleByTeacher } = useGetTodayScheduleByTeacher();
  const { isTodaySchedule } = useGetTodayScheduleExist();
  const { teacherName } = useGetUserName();

  function checkTodayClassEnd() {
    return isTodaySchedule && todayScheduleByTeacher === null;
  }

  return (
    <WelcomeTeacherWrapper>
      <WelcomeText>{teacherName} 선생님</WelcomeText>
      <WelcomeText>
        {checkTodayClassEnd() ? WELCOME_TEACHER_COMMENTS.goodJob : WELCOME_TEACHER_COMMENTS.hello}
      </WelcomeText>
    </WelcomeTeacherWrapper>
  );
}

const WelcomeTeacherWrapper = styled.header`
  margin: 2rem 0 1.2rem 0.4rem;
`;

const WelcomeText = styled.h1`
  ${({ theme }) => theme.fonts.title01};
`;
