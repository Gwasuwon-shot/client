import { useEffect, useState } from "react";
import styled from "styled-components";

function CountdownTimer({ initialCount = 60 }) {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      // alert("Time is up!");
    }
  }, [seconds]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  return (
    <TimerWrapper>
      <Timer>{formatTime()}</Timer>
    </TimerWrapper>
  );
}

export default CountdownTimer;

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

const Timer = styled.h1`
  margin-right: 1rem;
  font: ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.semantic_red};
`;
