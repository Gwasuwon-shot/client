import { styled } from "styled-components";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useGetLessonByParents from "../../hooks/useGetLessonByParents";
import ClassSchedule from "./ClassSchedule";

interface lessonListType {
  idx: number;
  teacherName: string;
  studentName: string;
  subject: string;
  count: number;
  nowCount: number;
  percent: number;
}

export default function ManageClass() {
  const { lessonParents } = useGetLessonByParents();

  return (
    <>
      <ManageClassTitle>수업관리</ManageClassTitle>

      <ClassScheduleListContainer>
        <ClassScheduleListWrapper>
          {lessonParents?.map((lesson: lessonListType) => {
            const { idx, subject, teacherName, studentName, count, nowCount, percent } = lesson;
            return (
              <ClassSchedule
                key={idx}
                idx={idx}
                currentClassCount={nowCount}
                entireClassCount={count}
                currentClassCountPercent={percent}
                subjectName={subject}
                teacherName={teacherName}
                studentName={studentName}
                subjectLabelBackgroundColor={STUDENT_COLOR[idx % 10]}
              />
            );
          })}
        </ClassScheduleListWrapper>
      </ClassScheduleListContainer>
    </>
  );
}

const ManageClassTitle = styled.h2`
  align-self: flex-start;

  margin: 2rem 0 0.8rem 1.8rem;

  ${({ theme }) => theme.fonts.title02};
  color: ${({ theme }) => theme.colors.grey900};
`;

const ClassScheduleListContainer = styled.div`
  padding-bottom: 8rem;
`;

const ClassScheduleListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 29.2rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.grey100};
  border-radius: 0.8rem;

  gap: 1.7rem;
`;
