import styled from "styled-components";

export default function Header() {
  return (
    <>
      <HeaderText>마이페이지</HeaderText>
    </>
  );
}

const HeaderText = styled.h1`
  margin-left: 1.4rem;
  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;
