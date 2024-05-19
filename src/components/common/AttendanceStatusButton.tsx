import styled from "styled-components";
import {
  AbsentAttendanceModalIc,
  AbsentDisabledAttendanceIc,
  AttendaceAttendanceModalIc,
  AttendanceDisabledAttendanceIc,
  CancelAttendanceModalIc,
  CancelDisabledAttendanceIc,
} from "../../assets";
import { ATTENDANCE_STATUS } from "../../core/common/attendanceStatus";

interface AttendanceStatusButtonProp {
  status: string;
  onClick: () => void;
  selectedStatus: string;
}

export default function AttendanceStatusButton(props: AttendanceStatusButtonProp) {
  const { status, onClick, selectedStatus } = props;

  function showAttendanceStatusButton() {
    switch (status) {
      case ATTENDANCE_STATUS.attend:
        return checkSameSelectedStatus() ? <AttendanceDisabledAttendanceIc /> : <AttendaceAttendanceModalIcon />;
      case ATTENDANCE_STATUS.cancel:
        return checkSameSelectedStatus() ? <CancelDisabledAttendanceIcon /> : <CancelAttendanceModalIcon />;
      case ATTENDANCE_STATUS.absent:
        return checkSameSelectedStatus() ? <AbsentDisabledAttendanceIcon /> : <AbsentAttendanceModalIcon />;
      default:
        return;
    }
  }

  function checkSameSelectedStatus() {
    return selectedStatus === status;
  }

  return (
    <ButtonWrapper $status={status} $isAlreadySelected={checkSameSelectedStatus()} onClick={onClick}>
      {showAttendanceStatusButton()}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<{ $status: string; $isAlreadySelected: boolean }>`
  width: ${({ $status }) => ($status === ATTENDANCE_STATUS.attend ? 29.2 : 13.7)}rem;
  height: ${({ $status }) => ($status === ATTENDANCE_STATUS.attend ? 14.4 : 7.4)}rem;
  margin-top: 1.7rem;

  background-color: ${({ theme, $status }) =>
    $status === ATTENDANCE_STATUS.attend
      ? theme.colors.green1
      : $status === ATTENDANCE_STATUS.cancel
      ? theme.colors.grey70
      : theme.colors.red1};

  border-radius: 0.8rem;

  &:active {
    background-color: ${({ theme, $status, $isAlreadySelected }) =>
      $isAlreadySelected
        ? $status === ATTENDANCE_STATUS.attend
          ? theme.colors.green1
          : $status === ATTENDANCE_STATUS.cancel
          ? theme.colors.grey70
          : theme.colors.red1
        : $status === ATTENDANCE_STATUS.attend
        ? theme.colors.green6
        : $status === ATTENDANCE_STATUS.cancel
        ? theme.colors.grey400
        : theme.colors.red3};
  }
`;

const AbsentAttendanceModalIcon = styled(AbsentAttendanceModalIc)`
  width: 7.8rem;
`;

const AttendaceAttendanceModalIcon = styled(AttendaceAttendanceModalIc)`
  width: 6.9rem;
`;

const CancelAttendanceModalIcon = styled(CancelAttendanceModalIc)`
  width: 6.9rem;
`;

const AttendanceDisabledAttendanceIcon = styled(AttendanceDisabledAttendanceIc)`
  width: 6.9rem;
`;

const AbsentDisabledAttendanceIcon = styled(AbsentDisabledAttendanceIc)`
  width: 6.9rem;
`;

const CancelDisabledAttendanceIcon = styled(CancelDisabledAttendanceIc)`
  width: 6.9rem;
`;
