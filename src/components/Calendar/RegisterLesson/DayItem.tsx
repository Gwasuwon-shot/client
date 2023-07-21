import { format, isSunday, isToday } from "date-fns";
import styled from "styled-components";
import { CalendarMoreLessonIc } from "../../../assets/index";
import { STUDENT_COLOR, DEEFAULT_STUDENT_COLOR } from "../../../core/common/studentColor";
import { DayItemProps } from "../../../type/calendar/dayItemType";
import Schedule from "../../../pages/Schedule";

export default function DayItem(props) {
  const { date, setOpenModal, setSelectedDate, myLessons, temporRegularSchedule, subject, studentName } = props;
  const formattedDate = format(date, "d");
  const isSundayDate = isSunday(date);
  const isTodayDate: boolean = isToday(date);
  const myLessonLength: number | undefined = myLessons?.dailyScheduleList.length;
  console.log(temporRegularSchedule?.scheduleList);
  function handleOpenModal() {
    setSelectedDate(date);
    setOpenModal(true);
  }
  console.log(temporRegularSchedule?.scheduleList[0]?.startTime);
  return (
    <>
      <Dayitem onClick={handleOpenModal} key={date.toString()} $issunday={isSundayDate}>
        <DayText $istoday={isTodayDate} $isnotvalid={format(date, "M") !== format(date, "M")}>
          {formattedDate}
        </DayText>
        <LessonWrapper>
          {temporRegularSchedule?.scheduleList && (
            <TemporaryScheduleWrapper $backgroundcolor={DEEFAULT_STUDENT_COLOR}>
              {temporRegularSchedule?.scheduleList[0]?.startTime}
              {temporRegularSchedule?.scheduleList[0]?.studentName?.slice(0, 2)}
            </TemporaryScheduleWrapper>
          )}
          {temporRegularSchedule?.scheduleList && myLessons && (myLessonLength as number) >= 3
            ? myLessons?.dailyScheduleList.map((lesson) => {
                const { schedule } = lesson;
                const { startTime, studentName, idx } = schedule;

                return (
                  <ScheduleWrapper $backgroundcolor={STUDENT_COLOR[idx % 10]} key={idx}>
                    {startTime} {studentName.slice(0, 2)}
                  </ScheduleWrapper>
                );
              })
            : myLessons?.dailyScheduleList.slice(0, 3).map((lesson) => {
                const { schedule } = lesson;
                const { startTime, studentName, idx } = schedule;

                return (
                  <ScheduleWrapper $backgroundcolor={STUDENT_COLOR[idx % 10]} key={idx}>
                    {startTime} {studentName.slice(0, 2)}
                  </ScheduleWrapper>
                );
              })}
          {myLessons && (myLessonLength as number) >= 4 && <MoreLessonIcon />}
        </LessonWrapper>
      </Dayitem>
    </>
  );
}

interface DayProp {
  $issunday: boolean;
}

const Dayitem = styled.article<DayProp>`
  display: flex;
  align-items: center;
  ${({ $issunday }) => `
      ${$issunday && "color: #FCB3A6"}
    `};
  flex-direction: column;
  cursor: pointer;

  width: 4.5rem;
  height: 7rem;
  gap: 0.2rem;

  padding-bottom: 0.3rem;
`;

interface DayTextProps {
  $isnotvalid: boolean;
  $istoday: boolean;
}

const DayText = styled.p<DayTextProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.6rem;
  height: 1.6rem;

  ${({ $istoday }) => `
    ${$istoday && "color: white; background-color: #0DA98E; border-radius: 50%; "}
  `};

  ${({ $isnotvalid }) => `
    ${$isnotvalid ? "color: #899199" : "#CED4DA"}
  `};

  ${({ theme }) => theme.fonts.caption03};
`;

const LessonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.2rem;
`;

const ScheduleWrapper = styled.p<{ $backgroundcolor: string }>`
  display: flex;
  align-items: center;

  height: 1.4rem;
  width: 3.5rem;
  ${({ theme }) => theme.fonts.caption02};

  color: ${({ theme }) => theme.colors.grey600};
  background-color: ${(props) => props.$backgroundcolor};
  border-radius: 0.2rem;
`;

const MoreLessonIcon = styled(CalendarMoreLessonIc)`
  width: 2rem;
  height: 0.2rem;
  padding-right: 1rem;
`;

const TemporaryScheduleWrapper = styled.p<{ $backgroundcolor: string }>`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  height: 1.4rem;

  ${({ theme }) => theme.fonts.caption02};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${(props) => props.$backgroundcolor};
  border-radius: 0.2rem;
`;
