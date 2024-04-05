import { RegularLessonNotebookIc, RegularLessonPencilIc } from "../../assets";
import {
  cycleNumberState,
  dateState,
  firstLessonDay,
  openDatePickerState,
  openTimePickerState,
} from "../../atom/timePicker/timePicker";

import { useRecoilState } from "recoil";
import styled from "styled-components";

interface LesssonProp {
  $isSelected: boolean;
}

export default function LessonInformation() {
  // 회차 표시 로직
  const [isTimePickerOpen, setIsTimePickerOpen] = useRecoilState<boolean>(openTimePickerState);

  function handleTimePicker() {
    setIsTimePickerOpen(true);
  }

  const [activeCycleSlide, setActiveCycleSlide] = useRecoilState(cycleNumberState);

  let selectedCycleText;
  if (activeCycleSlide === -1) {
    selectedCycleText = "회차를 선택하세요";
  } else {
    selectedCycleText = activeCycleSlide;
  }

  // 수업일 표시 로직

  const [isDatePickerOpen, setIsDatePickerOpen] = useRecoilState<boolean>(openDatePickerState);

  function handleDatePicker() {
    setIsDatePickerOpen(true);
  }
  const [activeDateSlide, setActiveDateSlide] = useRecoilState(dateState);
  const [lessonDay, setLessonDay] = useRecoilState(firstLessonDay);

  return (
    <LessonInformationWrapper>
      <IconWrapper>
        <RegularLessonNotebookIcon />
        <SectionName> 수업정보 </SectionName>
      </IconWrapper>
      <LessonWrapper>
        <Turn>
          <TurnName> 회차 </TurnName>
          <TurnButton type="button" onClick={handleTimePicker} $isSelected={activeCycleSlide !== -1}>
            {selectedCycleText}
          </TurnButton>
        </Turn>
        <StartDate>
          <StartDateName> 첫 수업일 </StartDateName>
          <StartDateButton type="button" onClick={handleDatePicker}>
            {activeDateSlide.year}년 {activeDateSlide.month}월 {activeDateSlide.date}일 {lessonDay}요일
          </StartDateButton>
          <RegularLessonPencilIcon onClick={handleDatePicker} />
        </StartDate>
      </LessonWrapper>
    </LessonInformationWrapper>
  );
}

const LessonInformationWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  display: flex;

  height: 3.1rem;
`;

const RegularLessonNotebookIcon = styled(RegularLessonNotebookIc)`
  margin-left: 1.7rem;
  margin-top: 1.5rem;
`;

const SectionName = styled.h1`
  margin-left: 0.8rem;
  margin-top: 1.5rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const LessonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.9rem;

  width: 28.8rem;
  height: 9.7rem;
  margin-left: 1.5rem;
  padding-left: 0.8rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey50};
`;

const Turn = styled.div`
  display: flex;
`;

const TurnName = styled.h2`
  display: flex;
  align-items: center;

  width: 7rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey400};
`;

const TurnButton = styled.button<LesssonProp>`
  padding: 0;
  ${({ theme }) => theme.fonts.body04};
  ${({ $isSelected, theme }) => !$isSelected && `color: ${theme.colors.grey100}`};
  ${({ $isSelected, theme }) => $isSelected && `color: ${theme.colors.grey700}`};
`;

const StartDate = styled.div`
  display: flex;
`;

const StartDateName = styled.h2`
  display: flex;
  align-items: center;

  width: 7rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey400};
`;

const StartDateButton = styled.button`
  padding: 0;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey700};
`;

const RegularLessonPencilIcon = styled(RegularLessonPencilIc)`
  width: 1.6rem;
  margin-top: 0.3rem;
  margin-left: 1.6rem;
`;
