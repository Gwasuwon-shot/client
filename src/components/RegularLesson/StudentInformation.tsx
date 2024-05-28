import { studentNameSelector, subjectNameSelector } from "../../atom/common/datePicker";
import { DEFAULT_STUDENT_COLOR } from "../../core/common/studentColor";

import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RegularLessonStudentIc } from "../../assets";
import SubjectLabel from "../common/SubjectLabel";

export default function StudentInformation() {
  const studentName = useRecoilValue(studentNameSelector);
  const subjectName = useRecoilValue(subjectNameSelector);

  return (
    <StudentInformationWrapper>
      <IconWrapper>
        <RegularLessonStudentIcon />
        <SectionName> 학생정보 </SectionName>
      </IconWrapper>
      <StudentWrapper>
        <StudentName> {studentName} </StudentName>
        <SubjectLabel subject={subjectName} backgroundColor={DEFAULT_STUDENT_COLOR} color="#00997D" />
      </StudentWrapper>
    </StudentInformationWrapper>
  );
}

const StudentInformationWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  display: flex;

  height: 2.8rem;
`;

const RegularLessonStudentIcon = styled(RegularLessonStudentIc)`
  margin-top: 1.2rem;
  margin-left: 1.7rem;
`;

const SectionName = styled.h1`
  margin-left: 0.8rem;
  margin-top: 1.1rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const StudentWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 28.8rem;
  height: 5rem;
  margin-left: 1.5rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey50};
`;

const StudentName = styled.h2`
  margin-left: 0.8rem;
  margin-right: 0.4rem;

  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey700};
`;
