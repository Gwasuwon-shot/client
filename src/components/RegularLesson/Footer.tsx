import { useEffect, useState } from "react";
import {
  dayState,
  firstLessonDay,
  openDatePickerState,
  openFinishDetailState,
  openStartDetailState,
  openTimePickerState,
} from "../../atom/timePicker/timePicker";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import DatePicker from "../../components/RegularLesson/TimePicker/DatePicker";
import DetailTimePicker from "../../components/RegularLesson/TimePicker/DetailTimePicker";
import TimePicker from "../../components/RegularLesson/TimePicker/TimePicker";
import useGetValidateTimeRange from "../../hooks/useGetValidateTimeRange";
import useModal from "../../hooks/useModal";
import CreateImpossibleModal from "../modal/CreateImpossibleModal";

export default function Footer() {
  const navigate = useNavigate();
  const { openModal, showModal } = useModal();

  const isTimePickerOpen = useRecoilValue<boolean>(openTimePickerState);
  const isDatePickerOpen = useRecoilValue(openDatePickerState);
  const isStartPickerOpen = useRecoilValue(openStartDetailState);
  const isFinishPickerOpen = useRecoilValue(openFinishDetailState);
  const selectedDays = useRecoilValue(dayState);

  const firstday = useRecoilValue(firstLessonDay);

  let [isSame, setIsSame] = useState(false);

  // 저장버튼 활성화 로직 : 수업일시 확정요일 배열과 첫 수업일이 변경될 경우, 배열을 순회하여 해당 수업일이 존재하는지 체크
  useEffect(() => {
    setIsSame(selectedDays.some((day) => day.dayOfWeek === firstday));
  }, [selectedDays, firstday]);

  const validateTimes = useGetValidateTimeRange(selectedDays);

  function moveToTuitionPayment() {
    if (validateTimes.every((result) => result.isSuccess) && isSame) {
      navigate("/tuition-payment");
    } else {
      showModal();
    }
  }

  return (
    <>
      {openModal && (
        <AlretModalWrapper>
          <CreateImpossibleModal />
        </AlretModalWrapper>
      )}
      <FooterWrapper>
        <FooterButtonWrapper selected={isSame} onClick={moveToTuitionPayment}>
          <FooterButton disabled={isSame}> 저장 </FooterButton>
        </FooterButtonWrapper>
        {isTimePickerOpen && (
          <ModalWrapper>
            <TimePicker />
          </ModalWrapper>
        )}
        {isDatePickerOpen && (
          <ModalWrapper>
            <DatePicker />
          </ModalWrapper>
        )}
        {(isStartPickerOpen || isFinishPickerOpen) && (
          <ModalWrapper>
            <DetailTimePicker />
          </ModalWrapper>
        )}
      </FooterWrapper>
    </>
  );
}

const FooterWrapper = styled.div`
  display: flex;

  width: 32rem;
  height: 7rem;
`;

const FooterButtonWrapper = styled.footer<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;

  width: 32rem;
  height: 6.3rem;
  padding: 0.8rem;

  background-color: ${({ theme }) => theme.colors.grey50};
  ${({ selected, theme }) => selected && `background-color: ${theme.colors.green5};`}
`;

const FooterButton = styled.button<{ disabled: boolean }>`
  display: flex;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey200};
  ${({ disabled, theme }) => disabled && `color: ${theme.colors.white};`}
`;

const ModalWrapper = styled.div`
  display: flex;

  position: fixed;
  bottom: 0;

  width: 100%;
`;

const AlretModalWrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100dvw;
`;
