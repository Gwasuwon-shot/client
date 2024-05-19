import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { attendanceLesson } from "../atom/attendanceCheck/attendanceLesson";
import { attendanceStatus } from "../atom/attendanceCheck/attendanceStatus";
import { isSnackBarOpen } from "../atom/common/isSnackBarOpen";
import { managingStatus } from "../atom/mangeLesson/managingStatus";
import { SnackBarPopup } from "../components/common";
import TeacherFooter from "../components/common/TeacherFooter";
import ManageLessonCategory from "../components/manageLesson/ManageLessonCategory";
import StudentLesson from "../components/manageLesson/StudentLesson";
import StudentNameBox from "../components/manageLesson/StudentNameBox";
import StudentPayments from "../components/manageLesson/StudentPayments";
import { ATTENDANCE_STATUS } from "../core/common/attendanceStatus";
import { MANAGE_LESSON_STATUS } from "../core/manageLesson/manageLessonStatus";
import { TEACHER_FOOTER_CATEGORY } from "../core/teacherHome/teacherFooter";
import useTeacherFooter from "../hooks/useTeacherFooter";

export default function ManageLessonDetail() {
  const status = useRecoilValue(managingStatus);
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);
  const selectedLesson = useRecoilValue(attendanceLesson);
  const [snackBarOpen, setSnackBarOpen] = useRecoilState(isSnackBarOpen);

  const { handleChangeActive } = useTeacherFooter();

  function checkIsStatusLesson() {
    return status === MANAGE_LESSON_STATUS.lesson;
  }

  useEffect(() => {
    setTimeout(() => {
      setAttendanceData({ idx: 0, status: "" });
    }, 2500);
    handleChangeActive(TEACHER_FOOTER_CATEGORY.classManaging);
  }, []);

  function checkStatus() {
    switch (attendanceData.status) {
      case ATTENDANCE_STATUS.absent:
        return (
          <StatusContent>
            <StatusLabel color="#FF3F18">결석</StatusLabel>으로
          </StatusContent>
        );
      case ATTENDANCE_STATUS.attend:
        return (
          <StatusContent>
            <StatusLabel color="#0DA98F">출석</StatusLabel>으로
          </StatusContent>
        );
      case ATTENDANCE_STATUS.cancel:
        return (
          <StatusContent>
            <StatusLabel color="#CED4DA">취소</StatusLabel>로
          </StatusContent>
        );
      default:
        return;
    }
  }

  return (
    <>
      {snackBarOpen && attendanceData.idx !== 0 && (
        <SnackBarPopup isCheck={true}>
          <Comment>
            {selectedLesson.count}회차 수업을 <p>{checkStatus()}</p> 수정 완료했어요.
          </Comment>
        </SnackBarPopup>
      )}
      <StudentNameBox />

      <ManageLessonDetailContainer>
        <ManageLessonWrapper>
          <ManageLessonCategory />
          {checkIsStatusLesson() ? <StudentLesson /> : <StudentPayments />}
        </ManageLessonWrapper>
      </ManageLessonDetailContainer>
      <TeacherFooter />
    </>
  );
}

const StatusContent = styled.div`
  display: flex;
  margin: 0 0.4rem;
`;

const StatusLabel = styled.p<{ color: string }>`
  color: ${({ color }) => color};
`;

const Comment = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body05};
`;

const ManageLessonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ManageLessonDetailContainer = styled.section`
  padding: 0 1.4rem;
`;
