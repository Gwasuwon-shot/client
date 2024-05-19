import React, { ReactNode } from "react";
import { styled } from "styled-components";

interface BottomButtonProps {
  children: ReactNode;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  type?: "button" | "submit" | "reset";
}

export default function BottomButton(props: BottomButtonProps) {
  const { children, isActive, onClick, disabled, type } = props;

  return (
    <BottomContainer disabled={disabled} $isActive={isActive} onClick={onClick}>
      <BottomText> {children} </BottomText>
    </BottomContainer>
  );
}

const BottomContainer = styled.button<{ $isActive: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6.3rem;

  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.green5 : theme.colors.grey50)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.grey0 : theme.colors.grey200)};
`;

const BottomText = styled.div`
  position: relative;

  /* top- 정확한 값으로 수정 필요 */
  top: -1rem;
  ${({ theme }) => theme.fonts.body01};
`;
