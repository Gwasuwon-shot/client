import { styled } from "styled-components";
import { RightArrowTeacherHomeIc } from "../../assets";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useMoveToLessonDetail from "../../hooks/useMoveToLessonDetail";
import { LessonType } from "../../type/teacherHome/previewBannerScheduleType";
import { ScheduleType } from "../../type/teacherHome/upcomingClassScheduleType";
import StudentColorBox from "../common/StudentColorBox";
import SubjectLabel from "../common/SubjectLabel";

interface UpcomingClassProps {
  lesson: LessonType;
  schedule: ScheduleType;
}

export default function UpcomingClass(props: UpcomingClassProps) {
  const { lesson, schedule } = props;
  const { idx, studentName, subject } = lesson;
  const { startTime, endTime } = schedule;
  const { handleMoveToManageLessonDetail } = useMoveToLessonDetail();

  return (
    <UpcomingClassWrapper onClick={() => handleMoveToManageLessonDetail(idx)}>
      <UpcomingClassBox>
        <StudentColorBox lessonIdx={idx} />
        <ClassTimeWrapper>
          {startTime} ~ {endTime}
        </ClassTimeWrapper>
        <StudentName>{studentName}</StudentName>
        <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[idx % 10]} color="#5B6166" />
      </UpcomingClassBox>
      <RightArrowTeacherHomeIcon />
    </UpcomingClassWrapper>
  );
}

const UpcomingClassBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const UpcomingClassWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 1.4rem;
`;

const ClassTimeWrapper = styled.p`
  width: 9.5rem;
  padding-left: 1.4rem;

  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body05};
`;

const StudentName = styled.p`
  margin: 0 0.6rem 0 1.5rem;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body01};
`;

const RightArrowTeacherHomeIcon = styled(RightArrowTeacherHomeIc)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
