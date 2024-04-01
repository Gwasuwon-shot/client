import { RegularLessonClockIc } from "../../assets";
import { editSchedule } from "../../atom/EditSchedule/editSchedule";
import { openFinishDetailState, openStartDetailState } from "../../atom/timePicker/timePicker";

import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function EditPageTime() {
  const [selectedTime, setSelectedTime] = useRecoilState(editSchedule);
  const { startTime, endTime } = selectedTime;
  // 2. 요일 시작, 종료시간 관리

  const [isStartPickerOpen, setIsStartPickerOpen] = useRecoilState<boolean>(openStartDetailState);

  function handlStartTimePicker() {
    setIsStartPickerOpen(true);
  }

  const [isFinishPickerOpen, setIsFinishPickerOpen] = useRecoilState<boolean>(openFinishDetailState);

  function handleFinishTimePicker() {
    setIsFinishPickerOpen(true);
  }

  return (
    <LessonDateWrapper>
      <IconWrapper>
        <RegularLessonClockIcon />
        <SectionName> 수업시간 </SectionName>
        <Explain> 수업종료 5분 뒤에 출결알람을 드릴게요. </Explain>
      </IconWrapper>

      <TimeWrapper>
        <TimeChoose> 시작 </TimeChoose>
        {selectedTime?.startTime === "" ? (
          <TimeButton $isPickerDone={isStartPickerOpen} onClick={handlStartTimePicker}>
            시간을 선택하세요
          </TimeButton>
        ) : (
          <TimeButton onClick={handlStartTimePicker} $isPickerDone={!isStartPickerOpen}>
            {Number(selectedTime?.startTime.slice(0, 2)) <= 12 ? (
              <>
                오전 {Number(selectedTime?.startTime.slice(0, 2))} {selectedTime?.startTime.slice(2)}
              </>
            ) : (
              <>
                오후 {Number(selectedTime?.startTime.slice(0, 2)) - 12} {selectedTime?.startTime.slice(2)}
              </>
            )}
          </TimeButton>
        )}
        <TimeChoose> 종료 </TimeChoose>
        {selectedTime?.endTime === "" ? (
          <TimeButton $isPickerDone={isStartPickerOpen} onClick={handleFinishTimePicker}>
            시간을 선택하세요
          </TimeButton>
        ) : (
          <TimeButton onClick={handleFinishTimePicker} $isPickerDone={!isFinishPickerOpen}>
            {Number(selectedTime?.endTime.slice(0, 2)) <= 12 ? (
              <>
                오전 {Number(selectedTime?.endTime.slice(0, 2))} {selectedTime?.endTime.slice(2)}
              </>
            ) : (
              <>
                오후 {Number(selectedTime?.endTime.slice(0, 2)) - 12} {selectedTime?.endTime.slice(2)}
              </>
            )}
          </TimeButton>
        )}
      </TimeWrapper>
    </LessonDateWrapper>
  );
}

const LessonDateWrapper = styled.section``;

const IconWrapper = styled.div`
  display: flex;

  height: 3.1rem;
`;

const RegularLessonClockIcon = styled(RegularLessonClockIc)`
  margin-top: 1.5rem;
  margin-left: 1.7rem;
`;

const SectionName = styled.h1`
  margin-left: 0.8rem;
  margin-top: 1.5rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const Explain = styled.h3`
  margin-top: 1.7rem;
  margin-left: 1.8rem;

  ${({ theme }) => theme.fonts.caption01};
  color: ${({ theme }) => theme.colors.grey300};
`;

const TimeWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.6rem;
`;

const TimeChoose = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.8rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey400};
`;

interface ButtonProp {
  $isPickerDone: boolean;
}

const TimeButton = styled.button<ButtonProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey100};
  ${({ $isPickerDone }) => `
      ${$isPickerDone && "color: black"}
    `};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;

  margin-left: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey50};
`;
