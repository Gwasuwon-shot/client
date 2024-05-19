import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isModalOpen } from "../../../atom/common/isModalOpen";
import { format, endOfMonth, endOfWeek, startOfMonth, startOfWeek, addDays, isSameDay } from "date-fns";
import ParentModal from "./ParentModal";
import ParentDayItem from "./ParentDayItem";
import useGetScheduleByUser from "../../../hooks/useGetScheduleByUser";

import { DaysProp } from "../../../type/calendar/daysPropsType";

export default function ParentsDays(props: DaysProp) {
  const { currentMonth } = props;
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(monthEnd);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedMonth = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const { isUserSchedule } = useGetScheduleByUser(formattedMonth);

  const rows: React.ReactNode[] = [];
  let days: React.ReactNode[] = [];
  let day: Date = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const myChildLessons = isUserSchedule?.find((item) => isSameDay(new Date(item.date), day));
      days.push(
        <ParentDayItem
          setOpenModal={setOpenModal}
          setSelectedDate={setSelectedDate}
          date={day}
          key={day.toString()}
          myChildLessons={myChildLessons}
        />,
      );

      day = addDays(day, 1);

      if (days.length === 7) {
        rows.push(
          <WeekWrapper key={day.toString()}>
            <DivideLine />
            <DayWrapper>{[...days]}</DayWrapper>
          </WeekWrapper>,
        );
      }
    }

    days = [];
  }

  return (
    <>
      <DaysWrapper>
        {[...rows]}
        {openModal && selectedDate && (
          <ModalWrapper>
            <ParentModal selectedDate={selectedDate} setOpenModal={setOpenModal} formattedMonth={formattedMonth} />
          </ModalWrapper>
        )}
      </DaysWrapper>
    </>
  );
}

const DaysWrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 31.2rem;
  margin-right: 0.4rem;
  margin-left: 0.4rem;
`;

const WeekWrapper = styled.article`
  display: flex;
  flex-direction: column;

  width: auto;
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 0.3rem;
`;

const DivideLine = styled.span`
  border-top: 1px solid ${({ theme }) => theme.colors.grey50};

  width: 32rem;
  margin-bottom: 0.6rem;
`;

const ModalWrapper = styled.section`
  display: flex;
  position: absolute;

  margin-top: -12rem;
  margin-left: -0.4rem;
`;
