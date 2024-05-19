import { styled } from "styled-components";

interface TreeProgressProps {
  width: number;
  progress: number;
}

export default function TreeProgress(props: TreeProgressProps) {
  const { width, progress } = props;

  return (
    <ProgressBarWrapper $width={width}>
      <Progress $progress={progress} />
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}rem;
  height: 0.4rem;
  border-radius: 0.3rem;

  background-color: ${({ theme }) => theme.colors.green1};
`;

const Progress = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.green5};
  border-radius: 0.3rem;
`;
