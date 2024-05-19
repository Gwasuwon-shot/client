import styled from "styled-components";
import { TuticeTitleLogo } from "../../assets";

export default function Feedback() {
  return (
    <Wrapper>
      <TitleWrapper>
        <TitleText>기타</TitleText>
      </TitleWrapper>
      <ContentWrapper>
        <a href="https://walla.my/survey/J3xptWZIqfPdEXVhzeFs">
          <ContentText>
            <TuticeTitleLogoIc />
            피드백 남기기
          </ContentText>
        </a>
      </ContentWrapper>
    </Wrapper>
  );
}

const TuticeTitleLogoIc = styled(TuticeTitleLogo)`
  width: 4.6rem;
  height: 1.3rem;

  margin-right: 0.6rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 32rem;
`;

const TitleWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 2.6rem;

  background-color: ${({ theme }) => theme.colors.grey20};
`;

const TitleText = styled.h1`
  margin-left: 1.4rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ContentText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.4rem;
  height: 6rem;
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};
  cursor: pointer;
`;
