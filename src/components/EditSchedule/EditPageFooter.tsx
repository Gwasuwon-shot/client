import { useRecoilState, useRecoilValue } from "recoil";
import { openDatePickerState, openFinishDetailState, openStartDetailState } from "../../atom/timePicker/timePicker";

import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getValidateTimeRange } from "../../api/getValidateTimeRange ";
import { updateSchedule } from "../../api/updateSchedule";
import { editDateState } from "../../atom/EditSchedule/editDateState";
import { editSchedule } from "../../atom/EditSchedule/editSchedule";
import EditDatePicker from "./EditDatePicker";
import EditFooterButton from "./EditFooterButton";
import EditDetailTimePicker from "./EditTimePicker";
import useModal from "../../hooks/useModal";
import CreateImpossibleModal from "../modal/CreateImpossibleModal";

export default function EditPageFooter() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useRecoilState<boolean>(openDatePickerState);
  const [isStartPickerOpen, setIsStartPickerOpen] = useRecoilState<boolean>(openStartDetailState);
  const [isFinishPickerOpen, setIsFinishPickerOpen] = useRecoilState<boolean>(openFinishDetailState);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { year, month, date } = useRecoilValue(editDateState);
  const { idx, startTime, endTime } = useRecoilValue(editSchedule);
  const navigate = useNavigate();
  const { openModal, showModal } = useModal();

  const patchEditDate = String(year) + "-" + String(month).padStart(2, "0") + "-" + String(date).padStart(2, "0");

  const { mutate: patchSchedule } = useMutation(updateSchedule, {
    onSuccess: () => {
      navigate("/schedule");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const validateTimeMutation = useMutation(
    ["validateTimeRange", startTime, endTime],
    () => getValidateTimeRange({ startTime, endTime }),
    {
      onSuccess: () => {
        patchSchedule({
          idx: idx,
          date: patchEditDate,
          startTime: startTime,
          endTime: endTime,
        });
      },
      onError: () => {
        showModal();
      },
    },
  );

  function handleEditLesson(): void {
    validateTimeMutation.mutate();
  }

  return (
    <>
      {openModal && (
        <AlertModalWrapper>
          <CreateImpossibleModal />
        </AlertModalWrapper>
      )}
      <EditFooterButton onClick={() => handleEditLesson()} isActive={isActive} disabled={!isActive} />
      {isDatePickerOpen && (
        <ModalWrapper>
          <EditDatePicker setIsActive={setIsActive} />
        </ModalWrapper>
      )}
      {(isStartPickerOpen || isFinishPickerOpen) && !isDatePickerOpen && (
        <ModalWrapper>
          <EditDetailTimePicker setIsActive={setIsActive} />
        </ModalWrapper>
      )}
    </>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
`;

const AlertModalWrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100dvw;
`;
