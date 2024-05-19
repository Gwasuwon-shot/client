import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FirstTreeParentsHomeIc, RightArrowParentsHomeIc } from "../../assets";
import SubjectLabel from "../common/SubjectLabel";

interface ClassScheduleProps {
  subjectName: string;
  teacherName: string;
  studentName: string;
  entireClassCount: number;
  currentClassCount: number;
  currentClassCountPercent: number;
  subjectLabelBackgroundColor: string;
  idx: number;
}

export default function ClassSchedule(props: ClassScheduleProps) {
  const {
    subjectName,
    teacherName,
    studentName,
    currentClassCountPercent,
    currentClassCount,
    entireClassCount,
    subjectLabelBackgroundColor,
    idx,
  } = props;
  const navigate = useNavigate();

  function handleGoToLessonDetail() {
    navigate(`/lesson-detail/${idx}`);
  }

  return (
    <ClassScheduleWrapper onClick={() => handleGoToLessonDetail()}>
      <StudentInfoWrapper>
        <ProgressTreeIconWrapper>
          <FirstTreeParentsHomeIc />
        </ProgressTreeIconWrapper>
        <StudentNameWrapper>{studentName}</StudentNameWrapper>
      </StudentInfoWrapper>

      <ClassDetailInfoWrapper>
        <TeacherSubjectWrapper>
          <SubjectLabel subject={subjectName} backgroundColor={subjectLabelBackgroundColor} color="#5B6166" />
          <TeacherName>{teacherName} 선생님</TeacherName>
        </TeacherSubjectWrapper>
        <ClassCountMessage>
          {currentClassCount}회차 <EntireCountMessage>/ {entireClassCount}회차</EntireCountMessage>
        </ClassCountMessage>
      </ClassDetailInfoWrapper>

      <RightArrowParentsHomeIcon />
    </ClassScheduleWrapper>
  );
}

const ClassScheduleWrapper = styled.section`
  display: flex;
  align-items: center;

  width: 26.1rem;
  height: 5.9rem;
`;

const StudentInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.2rem;
`;

const ProgressTreeIconWrapper = styled.div`
  width: 3.2rem;

  > svg {
    width: 100%;
  }
`;

const StudentNameWrapper = styled.p`
  ${({ theme }) => theme.fonts.caption01};
  color: ${({ theme }) => theme.colors.grey600};
`;

const ClassDetailInfoWrapper = styled.div`
  display: flex;

  flex-direction: column;

  margin-left: 2.3rem;
  width: 100%;
  height: 3.7rem;
  gap: 0.7rem;
`;

const TeacherSubjectWrapper = styled.div`
  display: flex;
  height: 1.6rem;
  width: 100%;
  gap: 0.6rem;
`;

const TeacherName = styled.p`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const ClassCountMessage = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const EntireCountMessage = styled.p`
  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey400};
`;

const RightArrowParentsHomeIcon = styled(RightArrowParentsHomeIc)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
