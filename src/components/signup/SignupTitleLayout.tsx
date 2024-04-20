import { ReactNode } from "react";
import { styled } from "styled-components";

interface SignupTitleLayoutProp {
  children: ReactNode;
}

export default function SignupTitleLayout(prop: SignupTitleLayoutProp) {
  const { children } = prop;
  return <Title>{children}</Title>;
}
const Title = styled.h1`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title01};

  white-space: pre-wrap;
`;
