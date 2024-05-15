import { styled } from "styled-components";

interface CheckButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CheckButton(props: CheckButtonProps) {
  const { text, isActive, onClick } = props;
  return text === "재전송" ? (
    <ResendButtonWrapper type="button" onClick={onClick}>
      <h1>{text}</h1>
    </ResendButtonWrapper>
  ) : (
    <CheckButtonWrapper type="button" onClick={onClick} $isActive={isActive}>
      <h1>{text}</h1>
    </CheckButtonWrapper>
  );
}

const ResendButtonWrapper = styled.button`
  flex: 0 1 auto;
  min-width: auto;
  white-space: nowrap;

  padding: 0.8rem;
  margin-right: 1.5rem;

  ${({ theme }) => theme.fonts.body03};

  border: 1px solid ${({ theme }) => theme.colors.grey70};
  background-color: ${({ theme }) => theme.colors.green1};
  color: ${({ theme }) => theme.colors.green5};
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body03};

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.green6};
    background-color: ${({ theme }) => theme.colors.green10};
  }
`;

const CheckButtonWrapper = styled.button<{ $isActive: boolean }>`
  flex: 0 1 auto;
  min-width: auto;
  white-space: nowrap;

  padding: 0.8rem;
  margin-right: 1.5rem;

  ${({ theme }) => theme.fonts.body03};

  border: 1px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.green4 : theme.colors.grey70)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.green5 : theme.colors.grey70)};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.grey0 : theme.colors.grey300)};
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body03};

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.green6};
    background-color: ${({ theme }) => theme.colors.green10};
  }
`;
