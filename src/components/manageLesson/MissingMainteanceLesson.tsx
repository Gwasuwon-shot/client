import { styled } from "styled-components";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import SubjectLabel from "../common/SubjectLabel";
import ManageStudentColorBox from "./ManageStudentColorBox";
import { ManageLessonEditIc, MissingMainteanceConfirmIc } from "../../assets";
import { useRecoilState } from "recoil";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";

interface MissingMainteanceLessonProps {
  idx: number;
  studentName: string;
  subject: string;
  isClickedEdit: boolean;
  handleConfirmDeleteLesson: () => void;
  handleConfirmMaintain: () => void;
}

export default function MissingMainteanceLesson(props: MissingMainteanceLessonProps) {
  const { idx, studentName, subject, isClickedEdit, handleConfirmDeleteLesson, handleConfirmMaintain } = props;

  const [selectedLesson, setSelectedLesson] = useRecoilState(attendanceLesson);

  function handleClickedDeleteButton() {
    handleConfirmDeleteLesson();
  }

  function handleClickMainteance() {
    handleConfirmMaintain();
    setSelectedLesson({ ...selectedLesson, studentName: studentName, subject: subject, lessonIdx: idx });
  }

  return (
    <LessonIndividualContainer>
      {isClickedEdit && <ManageLessonEditButton onClick={handleClickedDeleteButton} />}
      <MissingLessonBox>
        <MissingLessonContainer>
          <MissingLessonWrapper>
            <ManageStudentColorBox backgroundColor={STUDENT_COLOR[idx % 10]} />
            <StudentNameWrapper>{studentName}</StudentNameWrapper>
            <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[idx % 10]} color="#5B6166" />
          </MissingLessonWrapper>
          <InformationWrapper>
            <LessonInformation>회차종료</LessonInformation>
            <MissingMainteanceLessonButton onClick={handleClickMainteance} />
          </InformationWrapper>
        </MissingLessonContainer>
      </MissingLessonBox>
    </LessonIndividualContainer>
  );
}

const LessonIndividualContainer = styled.article`
  position: relative;

  height: 15.1rem;
  display: flex;
`;

const MissingLessonBox = styled.article`
  display: flex;
  align-items: center;

  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.grey70};
  border-radius: 0.8rem;

  width: 14rem;
  height: 14.4rem;

  margin-top: 0.8rem;
`;

const MissingLessonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 11.6rem;
  height: 1.6rem;
  margin-left: 1.2rem;
  margin-bottom: 1.4rem;
  gap: 0.7rem;
`;

const StudentNameWrapper = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body01};
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 10.6rem;
  height: 8.2rem;
`;

const MissingLessonContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 11.6rem;
  height: 10rem;
`;

const LessonInformation = styled.h2`
  margin-left: 1.2rem;
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey500};
`;

const ManageLessonEditButton = styled(ManageLessonEditIc)`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const MissingMainteanceLessonButton = styled(MissingMainteanceConfirmIc)`
  width: 8.1rem;
  height: 2.9rem;
  margin-left: 2.5rem;
  cursor: pointer;
`;
