import { firstLessonDay, openDatePickerState } from "../../atom/timePicker/timePicker";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dateState } from "../../atom/timePicker/timePicker";

interface ButtonProp {
  $isSelected: boolean;
}

export default function DateInput() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useRecoilState<boolean>(openDatePickerState);

  function handleDatePicker() {
    setIsDatePickerOpen(true);
  }

  const [activeDateSlide, setActiveDateSlide] = useRecoilState(dateState);
  const [lessonDay, setLessonDay] = useRecoilState(firstLessonDay);

  return (
    <InputWrapper>
      <TurnName> 시작 날짜 </TurnName>
      <TurnButtonWrapper>
        <TurnButtonName> {activeDateSlide.year}년 </TurnButtonName>
        <TurnButton type="button" onClick={handleDatePicker} $isSelected={isDatePickerOpen}>
          {" "}
          {activeDateSlide.month}월 {activeDateSlide.date}일 {lessonDay}요일{" "}
        </TurnButton>
      </TurnButtonWrapper>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.1rem;
`;

const TurnName = styled.h2`
  display: flex;
  margin-left: 1.8rem;
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey300};
`;

const TurnButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const TurnButton = styled.button<ButtonProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 15rem;
  ${({ theme }) => theme.fonts.title01};
  ${({ $isSelected, theme }) => !$isSelected && `color: ${theme.colors.grey700}`};
  ${({ $isSelected, theme }) => $isSelected && `color: ${theme.colors.grey300}`};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.green5};
`;

const TurnButtonName = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-right: 1.5rem;
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;
