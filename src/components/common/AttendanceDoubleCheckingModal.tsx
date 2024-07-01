import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { updateScheduleAttendance } from "../../api/updateScheduleAttendance";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import { ATTENDANCE_CHECK_RESPONSE } from "../../core/checkAttendance/attendaceCheckResponse";
import FutureImpossibleModal from "../modal/FutureImpossibleModal";
import BasicDoubleModal from "./BasicDoubleModal";

interface AttendanceDoubleCheckingModalProps {
  setIsCheckingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AttendanceDoubleCheckingModal(props: AttendanceDoubleCheckingModalProps) {
  const { setIsCheckingModalOpen } = props;
  const navigate = useNavigate();
  const attendanceData = useRecoilValue(attendanceStatus);
  const [isImpossibleModalOpen, setIsImpossibleModalOpen] = useState(false);

  function handleBackToCheckAttendance() {
    setIsCheckingModalOpen(false);
  }

  const { mutate: updateAttendance } = useMutation(updateScheduleAttendance, {
    onSuccess: () => {
      navigate("/complete-check-attendance", { state: ATTENDANCE_CHECK_RESPONSE });
    },
    onError: () => {
      setIsImpossibleModalOpen(true);
    },
  });

  function handleMoveToSuccessCheckingAttendance() {
    updateAttendance(attendanceData);
    setIsCheckingModalOpen(false);
  }

  function checkStatusText() {
    if (attendanceData?.status === "취소") {
      return attendanceData?.status + "로";
    } else {
      return attendanceData?.status + "으로";
    }
  }

  function handleCloseModal() {
    setIsImpossibleModalOpen(false);
  }

  return (
    <>
      {isImpossibleModalOpen && (
        <FutureImpossibleModal
          handleCloseModal={handleCloseModal}
          handleCloseDoubleCheckModal={handleBackToCheckAttendance}
        />
      )}
      <BasicDoubleModal
        leftButtonName="취소"
        rightButtonName="확인"
        handleClickLeftButton={handleBackToCheckAttendance}
        handleClickRightButton={handleMoveToSuccessCheckingAttendance}>
        <AskingSureToCheckAttendance>{checkStatusText()} 체크하시겠어요?</AskingSureToCheckAttendance>
      </BasicDoubleModal>
    </>
  );
}

const AskingSureToCheckAttendance = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;
