import React from "react";
import { styled } from "styled-components";

interface ProgressBarProps {
  progress: number;
}

export default function MainLessonsProgressBar({ progress }: ProgressBarProps) {
  return (
    <ProgressBarWrapper>
      <Progress width={`${progress}%`} />
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled.div`
  width: 11.6rem;
  height: 0.4rem;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.green1};
`;

const Progress = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 3px;

  background-color: ${({ theme }) => theme.colors.green5};
`;
