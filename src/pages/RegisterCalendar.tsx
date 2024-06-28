import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import styled from "styled-components";

import Dayofweek from "../components/Calendar/Dayofweek";
import Days from "../components/Calendar/RegisterLesson/Days";
import YearandMonthRegister from "../components/Calendar/RegisterLesson/YearandMonthRegister";

export default function RegisterCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  function handleToPrevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  function handleToNextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }
  return (
    <CalendarWrapper>
      <YearandMonthRegister
        currentMonth={currentMonth}
        handleToPrevMonth={handleToPrevMonth}
        handleToNextMonth={handleToNextMonth}
      />
      <Dayofweek />
      <Days currentMonth={currentMonth} />
    </CalendarWrapper>
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
