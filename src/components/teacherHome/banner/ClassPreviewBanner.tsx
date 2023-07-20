import { styled } from "styled-components";
import { UpcomingClassLogoTeacherHomeIc } from "../../../assets";
import { CLASS_PREVIEW_BANNER_COMMENTS } from "../../../core/teacherHome/classPreviewBannerComments";
import useGetTodayScheduleByTeacher from "../../../hooks/useGetTodayScheduleByTeacher";
import AttendanceCheckButton from "../../common/AttendanceCheckButton";
import SubjectLabel from "../../common/SubjectLabel";

// interface ClassPreviewBannerProps {
//   todaySchedule: PreviewBannerScheduleType;
// }

export default function ClassPreviewBanner() {
  const { todaySchedule } = useGetTodayScheduleByTeacher();
  const { lesson, timeStatus, schedule } = todaySchedule;
  const { studentName, subject } = lesson;
  const { count } = schedule;
  console.log(todaySchedule);

  function showClassPreviewComment(timeStatus: number) {
    switch (timeStatus) {
      case 1:
        return CLASS_PREVIEW_BANNER_COMMENTS.upcoming;
      case 2:
        return CLASS_PREVIEW_BANNER_COMMENTS.ing;
      case 3:
        return CLASS_PREVIEW_BANNER_COMMENTS.end;
      default:
        return;
    }
  }

  function checkClassNotYet(timeStatus: number) {
    return timeStatus === 1;
  }

  return (
    <ClassPreviewBannerWrapper>
      <article>
        <StudentNameWrapper>
          <StudentName>{studentName}</StudentName>
          <Student>학생</Student>
          <SubjectLabel subject={subject} backgroundColor="#B0E0D6" color="#00997D" />
        </StudentNameWrapper>
        <ClassStatusWrapper>
          <ClassCountMentWrapper>{count} 회차 수업이</ClassCountMentWrapper>
          {showClassPreviewComment(timeStatus)}
        </ClassStatusWrapper>
      </article>
      {checkClassNotYet(timeStatus) ? <UpcomingClassLogoTeacherHomeIcon /> : <AttendanceCheckButton />}
    </ClassPreviewBannerWrapper>
  );
}

const ClassPreviewBannerWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  width: 29.2rem;
  height: 8rem;
  padding: 1.6rem 1rem 1.6rem 1.4rem;

  background-color: ${({ theme }) => theme.colors.green5};
  color: ${({ theme }) => theme.colors.grey0};

  border-radius: 0.8rem;
`;

const StudentNameWrapper = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-right: 1rem;

  ${({ theme }) => theme.fonts.title02};
`;

const StudentName = styled.p`
  ${({ theme }) => theme.fonts.title02};
`;

const Student = styled.p`
  ${({ theme }) => theme.fonts.title03};
`;

const ClassStatusWrapper = styled.p`
  display: flex;

  margin-top: 0.3rem;
  ${({ theme }) => theme.fonts.body02};
`;

const ClassCountMentWrapper = styled.p`
  margin-right: 0.5rem;
  margin-bottom: -0.5rem;
`;

const UpcomingClassLogoTeacherHomeIcon = styled(UpcomingClassLogoTeacherHomeIc)`
  width: 7.6rem;
  margin-top: 1rem;
`;
