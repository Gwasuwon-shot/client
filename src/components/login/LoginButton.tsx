import { styled } from "styled-components";

interface LoginButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isActive: boolean;
  disabled: boolean;
}

export default function LoginButton(props: LoginButtonProps) {
  const { onClick, isActive, disabled } = props;

  return (
    <Button type="button" disabled={disabled} $isActive={isActive} onClick={onClick}>
      로그인
    </Button>
  );
}

const Button = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;

  width: 29.2rem;
  height: 5rem;
  padding: 0.8rem;

  border-radius: 0.8rem;

  flex-shrink: 0;

  gap: 0.8rem;

  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.green5 : theme.colors.grey50)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.grey0 : theme.colors.grey200)};
`;
