import { styled } from "styled-components";
import BottomButton from "../common/BottomButton";

interface EditFooterButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isActive: boolean;
  disabled: boolean;
}

export default function EditFooterButton(props: EditFooterButtonProps) {
  const { onClick, isActive, disabled } = props;

  return (
    <BottomButton disabled={disabled} isActive={isActive} onClick={onClick}>
      저장
    </BottomButton>
  );
}

const Button = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 29.2rem;
  height: 5rem;
  padding: 0.8rem;

  border-radius: 8px;

  flex-shrink: 0;

  gap: 0.8rem;

  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.green5 : theme.colors.grey50)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.grey0 : theme.colors.grey200)};
`;
