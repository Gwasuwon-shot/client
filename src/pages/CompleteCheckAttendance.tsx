import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import REACTGA from "react-ga4";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { attendanceLesson } from "../atom/attendanceCheck/attendanceLesson";
import { attendanceStatus } from "../atom/attendanceCheck/attendanceStatus";
import { isModalOpen } from "../atom/common/isModalOpen";
import { isSnackBarOpen } from "../atom/common/isSnackBarOpen";
import RoundBottomButton from "../components/common/RoundBottomButton";
import RoundBottomMiniButton from "../components/common/RoundBottomMiniButton";
import SendAlarmCheckModal from "../components/common/SendAlarmCheckModal";
import SubjectLabel from "../components/common/SubjectLabel";
import check from "../core/checkAttendance/check.json";
import checkCircle from "../core/checkAttendance/check_circle.json";
import { ATTENDANCE_STATUS } from "../core/common/attendanceStatus";
import { STUDENT_COLOR } from "../core/common/studentColor";
import useModal from "../hooks/useModal";
import useTeacherFooter from "../hooks/useTeacherFooter";

export default function CompleteCheckAttendance() {
  const { state } = useLocation();
  const { isLastCount, attendanceSchedule } = state;
  const { date, dayOfWeek } = attendanceSchedule;
  const [attendanceDate, setAttendanceDate] = useState(
    `${new Date(date).getFullYear() 
      }년 ${ 
      Number(new Date(date).getMonth() + 1) 
      }월 ${ 
      new Date(date).getDate() 
      }일 `,
  );
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);
  const navigate = useNavigate();
  const { modalRef, closeModal, unShowModal, showModal } = useModal();
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const selectedLesson = useRecoilValue(attendanceLesson);
  const { lessonIdx, studentName, count, subject, scheduleIdx } = selectedLesson;
  const { handleMoveToPage } = useTeacherFooter();
  const [snackBarOpen, setSnackBarOpen] = useRecoilState(isSnackBarOpen);

  useEffect(() => {
    setOpenModal(false);
  }, []);

  function checkIsAttendance() {
    return attendanceData?.status === ATTENDANCE_STATUS.attend;
  }

  function handleMoveToHome() {
    setSnackBarOpen(true);
    navigate(-1);
    REACTGA.event({
      category: "출결체크 > 확인",
      action: "Confirm",
    });
  }

  function handleOpenSendAlarmModal() {
    showModal();
    REACTGA.event({
      category: "출결체크 > 학부모 알림 전송",
      action: "Send Alarm to Parents",
    });
  }

  return (
    <>
      {openModal && (
        <SendAlarmCheckModal
          idx={lessonIdx}
          studentName={studentName}
          subject={subject}
          count={count}
          scheduleIdx={scheduleIdx}
        />
      )}
      <CompleteCheckAttendanceWrapper>
        <LottieImage>
          {isLastCount ? (
            <Lottie loop={false} animationData={checkCircle} style={{ width: "50%", height: "50%" }} />
          ) : (
            <Lottie loop={false} animationData={check} style={{ width: "50%", height: "50%" }} />
          )}
        </LottieImage>
        <ClassDate>
          {attendanceDate} ({dayOfWeek}) {count}회차 수업
        </ClassDate>
        <TextWrapper>
          <Main>{studentName}</Main>
          <Sub>학생</Sub>
          <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[lessonIdx % 10]} color="#5B6166" />
        </TextWrapper>
        <StatusMentionWrapper>
          <StatusMention>수업이</StatusMention>
          <Status $status={attendanceData?.status}>{attendanceData?.status}</Status>
          <StatusMention>처리 되었습니다.</StatusMention>
        </StatusMentionWrapper>
        {checkIsAttendance() ? (
          <ButtonWrapper>
            <RoundBottomMiniButton isGreen={false} onClick={handleMoveToHome}>
              확인
            </RoundBottomMiniButton>
            <RoundBottomMiniButton isGreen onClick={handleOpenSendAlarmModal}>
              학부모 알림 전송
            </RoundBottomMiniButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper onClick={handleMoveToHome}>
            <RoundBottomButton buttonMessage="확인" />
          </ButtonWrapper>
        )}
      </CompleteCheckAttendanceWrapper>
    </>
  );
}

const TextWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.grey900};
`;

const Main = styled.h1`
  margin-right: 0.5rem;
  ${({ theme }) => theme.fonts.title02}
`;

const Sub = styled.p`
  margin-right: 0.5rem;
  ${({ theme }) => theme.fonts.title03}
`;

const ClassDate = styled.p`
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body07};
`;

const Status = styled.p<{ $status: string }>`
  margin: 0 0.5rem;

  color: ${({ theme, $status }) =>
    $status === ATTENDANCE_STATUS.attend
      ? theme.colors.green5
      : $status === ATTENDANCE_STATUS.absent
      ? theme.colors.red5
      : theme.colors.grey900};
  ${({ theme }) => theme.fonts.title02};
`;

const StatusMention = styled.p`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title03};
`;

const StatusMentionWrapper = styled.article`
  display: flex;
`;

const CompleteCheckAttendanceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LottieImage = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 8.19rem;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 2.2rem;

  width: 29.5rem;
`;
