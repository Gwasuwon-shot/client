import { styled } from "styled-components";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import StudentColorBox from "../common/StudentColorBox";
import SubjectLabel from "../common/SubjectLabel";

interface TodayClassSceduleProps {
  studentName: string;
  subject: string;
  startTime: string;
  endTime: string;
  teacherName: string;
  classCount: number;
}

export default function TodayClassScedule(props: TodayClassSceduleProps) {
  const { studentName, subject, startTime, endTime, teacherName, classCount } = props;

  return (
    <TodayClassScheduleWrapper>
      <TodayClassContainer>
        <ClassInfo>
          <StudentColorBox lessonIdx={classCount} />
          <ClassTime>
            {startTime} ~ {endTime}
          </ClassTime>
          <StudentName>{studentName}</StudentName>
          <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[classCount % 11]} color="#5B6166" />
          <TeacherName>{teacherName} 선생님</TeacherName>
        </ClassInfo>
      </TodayClassContainer>
    </TodayClassScheduleWrapper>
  );
}

const TodayClassScheduleWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 29.2rem;
  height: 6rem;
  margin: 0.9rem auto 0 auto;
  padding-left: 1.4rem;

  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.grey100};
`;

const TodayClassContainer = styled.div`
  display: flex;
  height: 3.6rem;
  gap: 1.8rem;
`;

const ClassTime = styled.div`
  display: flex;
  width: 9rem;
  padding-left: 1rem;
  align-items: center;
  height: 1.4rem;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StudentName = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.6rem;
  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const TeacherName = styled.div`
  margin-left: 0.5rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const ClassInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
