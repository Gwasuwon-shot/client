import styled from "styled-components";
import CommonBackButton from "../common/CommonBackButton";

export default function NoAttendanceheader() {
  return (
    <>
      <CommonBackButton />
      <HeaderWrapper>
        <HeaderName>놓친 출결</HeaderName>
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;

  margin-right: 1.4rem;
  margin-bottom: 1.4rem;
  margin-left: 1.4rem;

  gap: 0.8rem;
`;

const HeaderName = styled.h1`
  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;
