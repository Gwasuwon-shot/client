import { ReactNode } from "react";
import { styled } from "styled-components";
interface RoundBottomMiniButtonProps {
  isGreen: boolean;
  children: ReactNode;
  onClick: () => void;
}

export default function RoundBottomMiniButton(props: RoundBottomMiniButtonProps) {
  const { isGreen, children, onClick } = props;

  return (
    <Button type="button" $isGreen={isGreen} onClick={onClick}>
      {children}
    </Button>
  );
}

const Button = styled.button<{ $isGreen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13.8rem;
  height: 5rem;
  border-radius: 0.8rem;

  background-color: ${({ theme, $isGreen }) => ($isGreen ? theme.colors.green5 : theme.colors.green1)};
  color: ${({ theme, $isGreen }) => ($isGreen ? theme.colors.white : theme.colors.green5)};

  ${({ theme }) => theme.fonts.body01}
`;
