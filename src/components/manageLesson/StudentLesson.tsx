import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { agreeSend } from "../../atom/common/agreeSend";
import { isSnackBarOpen } from "../../atom/common/isSnackBarOpen";
import { SuccessSendingAlarmSnackBar } from "../common";
import AttendanceList from "./AttendanceInforms";
import TreeLevel from "./TreeLevel";

export default function StudentLesson() {
  const [snackBarOpen, setSanckBarOpen] = useRecoilState(isSnackBarOpen);
  const [isAgreeSend, setIsAgreeSend] = useRecoilState<undefined | string>(agreeSend);

  useEffect(() => {
    setTimeout(() => {
      setIsAgreeSend(undefined);
    }, 2500);
  }, []);

  return (
    <>
      {snackBarOpen && isAgreeSend && (
        <SnackBarWrapper>
          <SuccessSendingAlarmSnackBar />
        </SnackBarWrapper>
      )}
      <TreeLevel />
      <AttendanceList />
    </>
  );
}

const SnackBarWrapper = styled.div`
  position: fixed;
  margin-left: -1.4rem;
  bottom: 2%;
`;
