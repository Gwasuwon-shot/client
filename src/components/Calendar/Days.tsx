import React from "react";
import styled from "styled-components";
import { parse, format, endOfMonth, endOfWeek, startOfMonth, startOfWeek, addDays, isSunday } from "date-fns";

export default function Days({ currentMonth }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(monthEnd);

  const rows: React.ReactNode[] = [];
  let days: React.ReactNode[] = [];
  let day: Date = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const sunDay = isSunday(day);

      days.push(
        <Day key={day.toString()} $issunday={sunDay}>
          <DayText $istoday={format(currentMonth, "d")} $isnotvalid={format(currentMonth, "M") !== format(day, "M")}>
            {formattedDate}
          </DayText>
        </Day>,
      );
      day = addDays(day, 1);
    }
    rows.push(<DaysWrapper key={day.toString()}>{days}</DaysWrapper>);
    days = [];
  }

  return <Wrapper>{rows}</Wrapper>;
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: auto;
`;

const DaysWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 28.3rem;
`;

interface DayProp {
  $issunday: boolean;
}

const Day = styled.article<DayProp>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ $issunday }) => `
    ${$issunday ? "color: #FCB3A6" : undefined}
  `};

  height: 6rem;
`;

interface DayTextProps {
  $isnotvalid: boolean;
}

const DayText = styled.p<DayTextProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3rem;
  height: 1.2rem;

  ${({ $isnotvalid, $istoday }) => `
    ${$isnotvalid ? "color: #CED4DA" : ""},
    ${$istoday ? "color: #0DA98E" : ""}
  `};
`;

const ScheduleWrapper = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0.2rem 0;
  margin-top: 0.5rem;
`;
