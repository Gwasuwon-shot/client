import { styled } from "styled-components";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useMoveToLessonDetail from "../../hooks/useMoveToLessonDetail";
import SubjectLabel from "../common/SubjectLabel";
import ManageStudentColorBox from "./ManageStudentColorBox";
import { ManageLessonEditIc } from "../../assets";
import { useRecoilState } from "recoil";
import { latestRegularScheduleType } from "../../type/manageLesson/lessonListType";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";

interface FinishedLessonType {
  idx: number;
  studentName: string;
  subject: string;
  percent: number;
  isClickedEdit: boolean;
  handleConfirmDeleteLesson: () => void;
  latestRegularSchedule: latestRegularScheduleType;
}

export default function FinishedLesson(props: FinishedLessonType) {
  const { handleConfirmDeleteLesson, idx, studentName, subject, latestRegularSchedule, isClickedEdit } = props;
  const { dayOfWeek, startTime, endTime } = latestRegularSchedule;
  const { handleMoveToManageLessonDetail } = useMoveToLessonDetail();
  const [deleteConfirmLesson, setDeleteConfirmLesson] = useRecoilState(attendanceLesson);

  function handleClickedDeleteButton() {
    handleConfirmDeleteLesson();
    setDeleteConfirmLesson({ ...deleteConfirmLesson, lessonIdx: idx });
  }

  return (
    <LessonIndividualContainer>
      {isClickedEdit && <ManageLessonEditButton onClick={() => handleClickedDeleteButton()} />}
      <MainLessonBox onClick={() => handleMoveToManageLessonDetail(idx)}>
        <FinishedLessonWrapperContainer>
          <MainLessonWrapper>
            <ManageStudentColorBox backgroundColor={"#E9ECEF"} />
            <StudentNameWrapper>{studentName}</StudentNameWrapper>
            <SubjectLabel subject={subject} backgroundColor={"#E9ECEF"} color="#5B6166" />
          </MainLessonWrapper>
          <DaysWrapper>
            <LessonInformation>수업종료</LessonInformation>
            <DayOfWeekWrapper>
              <p>{dayOfWeek}</p>
              <p>
                {startTime} - {endTime}
              </p>
            </DayOfWeekWrapper>
          </DaysWrapper>
        </FinishedLessonWrapperContainer>
      </MainLessonBox>
    </LessonIndividualContainer>
  );
}

const LessonIndividualContainer = styled.article`
  position: relative;
  height: 15.1rem;
  display: flex;
`;

const MainLessonBox = styled.article`
  display: flex;
  align-items: center;

  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.grey70};
  border-radius: 0.8rem;

  width: 14rem;
  height: 14.4rem;

  margin-top: 0.8rem;
`;

const MainLessonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 11.6rem;
  height: 1.6rem;
  margin-bottom: 1.4rem;
  gap: 0.7rem;
  margin-left: 1.2rem;
`;

const StudentNameWrapper = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body01};
`;

const DaysWrapper = styled.div`
  margin-left: 1.2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.4rem;
  width: 11.6rem;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body05};
`;

const FinishedLessonWrapperContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 23rem;
`;

const LessonInformation = styled.h2`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey500};
`;

const DayOfWeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem ${({ theme }) => theme.colors.grey900};
`;

const ManageLessonEditButton = styled(ManageLessonEditIc)`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
