import { NextMonthArrowButton, PrevMonthArrowButton } from "../../assets";

import { format } from "date-fns";
import styled from "styled-components";

interface YearandMonthProps {
  currentMonth: Date;
  handleToPrevMonth: () => void;
  handleToNextMonth: () => void;
}

export default function YearandMonth(props: YearandMonthProps) {
  const { currentMonth, handleToPrevMonth, handleToNextMonth } = props;

  function handleGoToPrevMonth() {
    handleToPrevMonth();
  }

  function handleGoToNextMonth() {
    handleToNextMonth();
  }
  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <CalendarText>캘린더</CalendarText>
          <YearMonthWrapper>
            <PrevMonthButton onClick={() => handleGoToPrevMonth()} />
            {format(currentMonth, "yyyy")}년 {format(currentMonth, "MM")}월
            <NextMonthButton onClick={() => handleGoToNextMonth()} />
          </YearMonthWrapper>
        </HeaderContainer>
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 29rem;
  margin-right: 0.4rem;
  margin-bottom: 1.1rem;
  margin-left: 0.4rem;

  font-size: 1.1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 20rem;
  justify-content: space-between;
`;

const CalendarText = styled.p`
  ${({ theme }) => theme.fonts.title02};
`;

const YearMonthWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  gap: 1rem;

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
