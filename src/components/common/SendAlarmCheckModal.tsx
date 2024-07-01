import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { SubjectLabel } from ".";
import { requestAttendanceNotification } from "../../api/requestAttendanceNotification";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import { agreeSend } from "../../atom/common/agreeSend";
import { isSnackBarOpen } from "../../atom/common/isSnackBarOpen";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import { TEACHER_FOOTER_CATEGORY } from "../../core/teacherHome/teacherFooter";
import useModal from "../../hooks/useModal";
import useTeacherFooter from "../../hooks/useTeacherFooter";
import ParentsDisabledAlarmModal from "../modal/ParentsDisabledAlarmModal";
import RoundBottomMiniButton from "./RoundBottomMiniButton";
import ToastModal from "./ToastModal";

interface SendAlarmCheckModalProps {
  idx: number;
  studentName: string;
  subject: string;
  count: number | undefined;
  scheduleIdx: number;
}

export default function SendAlarmCheckModal(props: SendAlarmCheckModalProps) {
  const { idx, studentName, subject, count, scheduleIdx } = props;
  const { unShowModal } = useModal();
  const navigate = useNavigate();
  const [isDisabledModalOpen, setIsDisabledModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState<string>();
  const { handleMoveToPage } = useTeacherFooter();
  const [isAgreeSend, setIsAgreeSend] = useRecoilState<undefined | string>(agreeSend);
  const setSnackBarOpen = useSetRecoilState(isSnackBarOpen);
  const setAttendanceData = useSetRecoilState(attendanceStatus);

  function handleMoveToHomeWithoutAlarm() {
    unShowModal();
    navigate(-1);
  }

  const queryClient = useQueryClient();

  const { data: sendAlarm } = useQuery(
    ["requestAttendanceNotification"],
    () => requestAttendanceNotification(scheduleIdx),
    {
      onSuccess: (res) => {
        if (res.data.message === "학부모에게 출결알람 보내기 성공") {
          handleMoveToHomeWithoutAlarm();
          setSnackBarOpen(true);
          setAttendanceData({ idx: 0, status: "" });
          console.log(sendAlarm);
        }
      },
      onError: (error: any) => {
        console.log(error);
        if (error?.response?.data?.message) {
          setErrMsg(error?.response?.data?.message);
        }
        setIsDisabledModalOpen(true);
      },
      enabled: !!isAgreeSend,
      suspense: false,
      useErrorBoundary: false,
    },
  );

  function handleSendAlarm() {
    setIsAgreeSend("true");
    queryClient.invalidateQueries(["requestAttendanceNotification"]);
  }

  function handleCloseModal() {
    setIsDisabledModalOpen(false);
    unShowModal();
    handleMoveToPage(TEACHER_FOOTER_CATEGORY.home);
  }

  return (
    <>
      {isDisabledModalOpen && (
        <ParentsDisabledAlarmModalWrapper>
          <ParentsDisabledAlarmModal handleCloseModal={handleCloseModal} errMsg={errMsg} />
        </ParentsDisabledAlarmModalWrapper>
      )}
      <ToastModal>
        <Title>출결알림 전송</Title>
        <ContentWrapper>
          <StudentNameWrapper>{studentName}</StudentNameWrapper> <Content>학생</Content>
          <SubjectLabel backgroundColor={STUDENT_COLOR[idx % 10]} color="#757A80" subject={subject} />
          <Content>의 학부모님께 </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content>{count}회차 수업 출결 알림을 보낼까요?</Content>
        </ContentWrapper>
        <ButtonWrapper>
          <RoundBottomMiniButton isGreen={false} onClick={handleMoveToHomeWithoutAlarm}>
            괜찮아요
          </RoundBottomMiniButton>
          <RoundBottomMiniButton isGreen={true} onClick={handleSendAlarm}>
            보낼래요
          </RoundBottomMiniButton>
        </ButtonWrapper>
      </ToastModal>
    </>
  );
}

const Title = styled.header`
  margin-top: 1.5rem;
  margin-bottom: 1.6rem;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title02};
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  width: 29rem;
  margin-top: 3.2rem;
`;

const StudentNameWrapper = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body01};
`;

const Content = styled.p`
  margin: 0 0.2rem;
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;

const ContentWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18.7rem;
  margin-bottom: 1rem;
`;

const ParentsDisabledAlarmModalWrapper = styled.div`
  position: fixed;
  z-index: 7;
`;
