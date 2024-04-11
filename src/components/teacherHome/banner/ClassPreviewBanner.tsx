import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { UpcomingClassLogoTeacherHomeIc } from "../../../assets";
import { attendanceLesson } from "../../../atom/attendanceCheck/attendanceLesson";
import { attendanceStatus } from "../../../atom/attendanceCheck/attendanceStatus";
import { isModalOpen } from "../../../atom/common/isModalOpen";
import { CLASS_PREVIEW_BANNER_COMMENTS } from "../../../core/teacherHome/classPreviewBannerComments";
import useGetLessonDetail from "../../../hooks/useGetLessonDetail";
import useGetMissingAttendanceByLessonExist from "../../../hooks/useGetMissingAttendanceByLessonExist";
import useGetTodayScheduleByTeacher from "../../../hooks/useGetTodayScheduleByTeacher";
import useModal from "../../../hooks/useModal";
import AttendanceCheckButton from "../../common/AttendanceCheckButton";
import AttendanceCheckModal from "../../common/AttendanceCheckModal";
import AttendanceDoubleCheckingModal from "../../common/AttendanceDoubleCheckingModal";
import SubjectLabel from "../../common/SubjectLabel";

export default function ClassPreviewBanner() {
  const { todayScheduleByTeacher, lesson, timeStatus, schedule } = useGetTodayScheduleByTeacher();
  const { studentName, subject } = useGetLessonDetail(lesson?.idx);
  const { expectedCount } = schedule !== undefined && schedule;
  const { isMissingAttendanceByLesson } = useGetMissingAttendanceByLessonExist(lesson?.idx);
  const navigate = useNavigate();
  const [isCheckingModalOpen, setIsCheckingModalOpen] = useState(false);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [selectedLesson, setSelectedLesson] = useRecoilState(attendanceLesson);
  const { showModal } = useModal();
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);

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

  function handleAttendance() {
    // 출결 체크 -> isMissingAttandance이 true면 놓친 출결 페이지로 이동
    // isMissingAttandance이 false면 출결 체크
    isMissingAttendanceByLesson ? navigate("/no-attendance-check") : showModal();
  }

  useEffect(() => {
    studentName &&
      subject &&
      setSelectedLesson({
        lessonIdx: lesson?.idx,
        studentName: studentName,
        count: expectedCount,
        subject: subject,
        scheduleIdx: schedule?.idx,
      });
  }, [studentName, subject]);

  useEffect(() => {
    setAttendanceData({ ...attendanceData, status: "" });
  }, []);

  return (
    <>
      {openModal && selectedLesson && (
        <ModalSection $isCheckingModalOpen={isCheckingModalOpen}>
          <AttendanceCheckModal setIsCheckingModalOpen={setIsCheckingModalOpen} />
        </ModalSection>
      )}

      {openModal && isCheckingModalOpen && (
        <ModalSection $isCheckingModalOpen={isCheckingModalOpen}>
          <AttendanceDoubleCheckingModal setIsCheckingModalOpen={setIsCheckingModalOpen} />
        </ModalSection>
      )}
      <ClassPreviewBannerWrapper>
        <article>
          <StudentNameWrapper>
            <StudentName>{studentName}</StudentName>
            <Student>학생</Student>
            <SubjectLabel subject={subject} backgroundColor="#B0E0D6" color="#00997D" />
          </StudentNameWrapper>
          <ClassStatusWrapper>
            <ClassCountMentWrapper>{expectedCount}회차 수업이</ClassCountMentWrapper>
            {showClassPreviewComment(timeStatus)}
          </ClassStatusWrapper>
        </article>
        {checkClassNotYet(timeStatus) ? (
          <UpcomingClassLogoTeacherHomeIcon />
        ) : (
          <AttendanceCheckButton onClick={handleAttendance} />
        )}
      </ClassPreviewBannerWrapper>
    </>
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
  align-items: center;

  margin-right: 1rem;

  ${({ theme }) => theme.fonts.title02};
`;

const StudentName = styled.p`
  ${({ theme }) => theme.fonts.title02};
`;

const Student = styled.p`
  margin: 0 0.5rem;
  ${({ theme }) => theme.fonts.title03};
`;

const ClassStatusWrapper = styled.div`
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
  height: 7.6rem;
  margin-bottom: -0.5rem;
`;

const ModalSection = styled.section<{ $isCheckingModalOpen: boolean }>`
  position: fixed;
  z-index: 3;
  margin: -12.1rem 0 0 -1.5em;
`;
