import { format, getMonth, isSunday, isToday } from "date-fns";
import styled from "styled-components";
import { CalendarMoreLessonIc } from "../../../assets/index";
import { STUDENT_COLOR } from "../../../core/common/studentColor";
import { DayItemProps } from "../../../type/calendar/dayItemType";

export default function ParentDayItem(props: DayItemProps) {
  const { date, setOpenModal, setSelectedDate, myChildLessons } = props;

  const formattedDate = format(date, "d");
  const isSundayDate: boolean = isSunday(date);
  const isTodayDate: boolean = isToday(date);
  const myChildLength: number | undefined = myChildLessons?.dailyScheduleList.length;
  const currentDate: Date = new Date();

  function handleOpenModal() {
    setSelectedDate(date);
    setOpenModal(true);
  }
  return (
    <>
      <Dayitem onClick={handleOpenModal} key={date.toString()} $issunday={isSundayDate}>
        <DayText $istoday={isTodayDate} $isnotvalid={getMonth(date) !== getMonth(currentDate)}>
          {formattedDate}
        </DayText>
        <LessonWrapper>
          {myChildLessons && (myChildLength as number) >= 4
            ? myChildLessons?.dailyScheduleList?.slice(0, 2).map((lesson) => {
                const { schedule, lessonIdx } = lesson;
                const { startTime, studentName, idx } = schedule;

                return (
                  <ScheduleWrapper $backgroundcolor={STUDENT_COLOR[lessonIdx % 10]} key={idx}>
                    {startTime} {studentName.slice(0, 2)}
                  </ScheduleWrapper>
                );
              })
            : myChildLessons?.dailyScheduleList.map((lesson) => {
                const { schedule, lessonIdx } = lesson;
                const { startTime, studentName, idx } = schedule;

                return (
                  <ScheduleWrapper $backgroundcolor={STUDENT_COLOR[lessonIdx % 10]} key={idx}>
                    {startTime} {studentName.slice(0, 2)}
                  </ScheduleWrapper>
                );
              })}
          {myChildLessons && (myChildLength as number) >= 4 && <MoreLessonIcon />}
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
  height: 6rem;
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
