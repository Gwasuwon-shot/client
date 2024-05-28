import { styled } from "styled-components";

interface InputHintProps {
  text: string;
  color: "red" | "green";
  isVisible?: boolean;
}

export default function InputHint({ text, color, isVisible }: InputHintProps) {
  if (!isVisible) return null;

  return <StyledText color={color}>{text}</StyledText>;
}

const StyledText = styled.p<{ color: "red" | "green" }>`
  margin-top: 0.5rem;
  margin-left: 0.2rem;
  color: ${({ color, theme }) =>
    color === "red" ? theme.colors.semantic_red : theme.colors.green5};
  ${({ theme }) => theme.fonts.body06};
`;
