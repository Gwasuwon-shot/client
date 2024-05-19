import React from "react"; // React 임포트 추가
import styled from "styled-components";

interface TextLabelProps {
  children: React.ReactNode;
}

export default function TextLabel({ children }: TextLabelProps) {
  return <Label>{children}</Label>;
}

const Label = styled.span`
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.grey300};
  ${({ theme }) => theme.fonts.body04};
`;
