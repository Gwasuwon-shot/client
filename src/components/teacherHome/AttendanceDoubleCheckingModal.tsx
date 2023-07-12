import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import BasicDoubleModal from "../common/BasicDoubleModal";

interface AttendanceDoubleCheckingModalProps {
  setIsCheckingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AttendanceDoubleCheckingModal(props: AttendanceDoubleCheckingModalProps) {
  const { setIsCheckingModalOpen } = props;
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);

  function handleBackToCheckAttendance() {
    setIsCheckingModalOpen(false);
  }

  function handleMoveToSuccessCheckingAttendance() {
    navigate("/");
  }

  function checkStatusText() {
    if (attendanceData?.status === "취소") {
      return attendanceData?.status + "로";
    } else {
      return attendanceData?.status + "으로";
    }
  }

  return (
    <BasicDoubleModal
      leftButtonName="취소"
      rightButtonName="확인"
      handleClickLeftButton={handleBackToCheckAttendance}
      handleClickRightButton={handleMoveToSuccessCheckingAttendance}>
      <AskingSureToCheckAttendance>{checkStatusText()} 체크하시겠어요?</AskingSureToCheckAttendance>
    </BasicDoubleModal>
  );
}

const AskingSureToCheckAttendance = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;
