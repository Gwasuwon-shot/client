import styled from "styled-components";
import { STUDENT_COLOR } from "../../core/common/studentColor";

import { useRecoilValue } from "recoil";
import { RegularLessonStudentIc } from "../../assets";
import { editLessonIdxState } from "../../atom/EditSchedule/editLessonIdx";
import { editSchedule } from "../../atom/EditSchedule/editSchedule";

export default function StudentInformation() {
  const { studentName, subject, idx } = useRecoilValue(editSchedule);
  const lessonIdx = useRecoilValue(editLessonIdxState);

  return (
    <StudentInformationWrapper>
      <IconWrapper>
        <RegularLessonStudentIcon />
        <SectionName> 학생정보 </SectionName>
      </IconWrapper>
      <StudentWrapper>
        <StudentName> {studentName} </StudentName>
        <ModalSubject $backgroundcolor={STUDENT_COLOR[lessonIdx % 10]}>{subject}</ModalSubject>
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
