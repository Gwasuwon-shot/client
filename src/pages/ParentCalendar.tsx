import { addMonths, setYear,subMonths } from "date-fns";
import React, { useEffect,useState } from "react";
import styled from "styled-components";

import Dayofweek from "../components/Calendar/Dayofweek";
import ParentsDays from "../components/Calendar/Parents/ParentsDays";
import YearandMonth from "../components/Calendar/YearandMonth";
import ParentsFooter from "../components/common/ParentsFooter";
import { PARENTS_FOOTER_CATEGORY } from "../core/parentsHome/parentsFooter";
import useParentsFooter from "../hooks/useParentsFooter";

// 수정없는 부모님 캘린더
export default function ParentCalenda() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [YearMonth, setYearMonth] = useState<string>("");

  function handleToPrevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  function handleToNextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  const { handleChangeActive } = useParentsFooter();

  useEffect(() => {
    handleChangeActive(PARENTS_FOOTER_CATEGORY.calendar);
  }, []);

  return (
    <>
      <CalendarWrapper>
        <YearandMonth
          currentMonth={currentMonth}
          handleToPrevMonth={handleToPrevMonth}
          handleToNextMonth={handleToNextMonth}
        />
        <Dayofweek />
        <ParentsDays currentMonth={currentMonth} />
      </CalendarWrapper>

      <ParentsFooter />
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
