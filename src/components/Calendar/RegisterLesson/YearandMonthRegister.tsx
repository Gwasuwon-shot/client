import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { NextMonthArrowButton, PrevMonthArrowButton, CancelButton } from "../../../assets";
import { useNavigate } from "react-router-dom";

interface YearandMonthProps {
  currentMonth: Date;
  handleToPrevMonth: () => void;
  handleToNextMonth: () => void;
}

export default function YearandMonthRegister(props: YearandMonthProps) {
  const { currentMonth, handleToPrevMonth, handleToNextMonth } = props;
  const navigate = useNavigate();
  function handleGoToPrevMonth() {
    handleToPrevMonth();
  }

  function handleGoToNextMonth() {
    handleToNextMonth();
  }

  function handleCancelPreview() {
    navigate(-1);
  }

  return (
    <HeaderWrapper>
      <CalendarText>캘린더</CalendarText>
      <YearMonthWrapper>
        <PrevMonthButton onClick={() => handleGoToPrevMonth()} />
        {format(currentMonth, "yyyy")}년 {format(currentMonth, "MM")}월
        <NextMonthButton onClick={() => handleGoToNextMonth()} />
      </YearMonthWrapper>
      <CancelCalendarButton onClick={() => handleCancelPreview()} />
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 29rem;
  margin-right: 0.4rem;
  margin-bottom: 1.1rem;
  margin-left: 0.4rem;

  font-size: 1.1rem;
`;

const CalendarText = styled.p`
  ${({ theme }) => theme.fonts.title02};
`;

const YearMonthWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.1rem;
  gap: 1rem;

  width: 12rem;
  ${({ theme }) => theme.fonts.body06};
`;

const PrevMonthButton = styled(PrevMonthArrowButton)`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`;

const NextMonthButton = styled(NextMonthArrowButton)`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`;

const CancelCalendarButton = styled(CancelButton)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
