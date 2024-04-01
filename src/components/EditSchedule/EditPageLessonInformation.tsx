import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { RegularLessonNotebookIc, RegularLessonPencilIc } from "../../assets";
import { editDateState } from "../../atom/EditSchedule/editDateState";
import { openDatePickerState } from "../../atom/timePicker/timePicker";

export default function LessonInformation() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useRecoilState<boolean>(openDatePickerState);
  const { year, month, date, dayOfWeek } = useRecoilValue(editDateState);
  function handleDatePicker() {
    setIsDatePickerOpen(true);
  }

  return (
    <LessonInformationWrapper>
      <IconWrapper>
        <RegularLessonNotebookIcon />
        <SectionName> 수업정보 </SectionName>
      </IconWrapper>
      <LessonWrapper>
        <Turn></Turn>
        <LessonDate>
          <LessonDateName> 수업일 </LessonDateName>
          <LessonDateEditButton type="button" onClick={handleDatePicker}>
            {year}년 {month}월 {date}일 {dayOfWeek}요일
          </LessonDateEditButton>
          <RegularLessonPencilIcon />
        </LessonDate>
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
  margin-top: 1.5rem;
  margin-left: 1.7rem;
`;

const SectionName = styled.h1`
  margin-left: 0.8rem;
  margin-top: 1.5rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const LessonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1.9rem;

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

const TurnButton = styled.button`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey100};

  padding: 0;
`;

const LessonDate = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 28.8rem;
  height: 3.6rem;

  background-color: ${({ theme }) => theme.colors.grey50};
  border-radius: 0.6rem;
`;
const LessonDateName = styled.h2`
  display: flex;
  align-items: center;

  width: 7rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey400};
`;
const LessonDateEditButton = styled.button`
  padding: 0;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey700};
`;

const RegularLessonPencilIcon = styled(RegularLessonPencilIc)`
  width: 1.6rem;
  height: 1.6rem;
`;
