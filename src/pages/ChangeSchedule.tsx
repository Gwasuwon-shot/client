import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import styled from "styled-components";
import Days from "../components/Calendar/Change/Days";
import Dayofweek from "../components/Calendar/Dayofweek";
import YearandMonth from "../components/Calendar/YearandMonth";
import TeacherFooter from "../components/common/TeacherFooter";

//수정이 가능한 캘린더
export default function ChangeSchedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  function handleToPrevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  function handleToNextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }
  return (
    <>
      <CalendarWrapper>
        <YearandMonth
          currentMonth={currentMonth}
          handleToPrevMonth={handleToPrevMonth}
          handleToNextMonth={handleToNextMonth}
        />
        <Dayofweek />
        <Days currentMonth={currentMonth} />
      </CalendarWrapper>
      <TeacherFooter />
    </>
  );
}

const CalendarWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 4rem;
  margin-right: 0.4rem;
  margin-left: 0.4rem;
`;
