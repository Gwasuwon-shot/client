import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import { ATTENDANCE_STATUS } from "../../core/common/attendanceStatus";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useModal from "../../hooks/useModal";
import AttendanceStatusButton from "./AttendanceStatusButton";
import SubjectLabel from "./SubjectLabel";
import ToastModal from "./ToastModal";

interface AttendanceCheckModalProp {
  isUpdateOpen?: boolean;
  setIsCheckingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AttendanceCheckModal(props: AttendanceCheckModalProp) {
  const { setIsCheckingModalOpen, isUpdateOpen } = props;
  const { unShowModal } = useModal();
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);
  const selectedLesson = useRecoilValue(attendanceLesson);
  const { lessonIdx, studentName, count, subject, scheduleIdx } = selectedLesson;

  function handleCancelAttendanceCheck() {
    unShowModal();
  }

  function checkSameSelectedStatus(status: string) {
    return attendanceData?.status === status;
  }

  function handleCheckAttendanceStatus(status: string) {
    !checkSameSelectedStatus(status) && setIsCheckingModalOpen(true);

    setAttendanceData({ idx: scheduleIdx, status: status });
  }

  return (
    <ToastModal>
      <ModalHeader>
        <CancelButton onClick={handleCancelAttendanceCheck}>X</CancelButton>
        <AttendanceModalHeader>출결 체크</AttendanceModalHeader>
      </ModalHeader>
      <TextWrapper>
        <Main $isTitle={true}>{studentName}</Main>
        <Sub $isTitle={true}>학생</Sub>
        <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[lessonIdx % 10]} color="#5B6166" />
      </TextWrapper>
      <TextWrapper>
        <Main $isTitle={false}>{count}회차</Main>
        <Sub $isTitle={false}>수업 출결 {isUpdateOpen ? "수정을" : "체크를"} 진행해 주세요</Sub>
      </TextWrapper>
      <AttendanceStatusButton
        status={ATTENDANCE_STATUS.attend}
        onClick={() => handleCheckAttendanceStatus(ATTENDANCE_STATUS.attend)}
        selectedStatus={attendanceData?.status}
      />
      <AttdenceStatusButtonWrapper>
        <AttendanceStatusButton
          status={ATTENDANCE_STATUS.cancel}
          onClick={() => handleCheckAttendanceStatus(ATTENDANCE_STATUS.cancel)}
          selectedStatus={attendanceData?.status}
        />
        <AttendanceStatusButton
          status={ATTENDANCE_STATUS.absent}
          onClick={() => handleCheckAttendanceStatus(ATTENDANCE_STATUS.absent)}
          selectedStatus={attendanceData?.status}
        />
      </AttdenceStatusButtonWrapper>
    </ToastModal>
  );
}

const CancelButton = styled.button`
  color: ${({ theme }) => theme.colors.grey400};
  ${({ theme }) => theme.fonts.body02};
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;

  width: 17rem;
  margin-bottom: 3.4rem;
  margin-left: -10rem;
`;

const AttendanceModalHeader = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.grey900};
`;

const Main = styled.h1<{ $isTitle: boolean }>`
  margin-right: 0.5rem;
  ${({ theme, $isTitle }) => ($isTitle ? theme.fonts.title02 : theme.fonts.body01)}
`;

const Sub = styled.p<{ $isTitle: boolean }>`
  margin-right: 0.5rem;
  ${({ theme, $isTitle }) => ($isTitle ? theme.fonts.title03 : theme.fonts.body02)}
`;

const AttdenceStatusButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;
