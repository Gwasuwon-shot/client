import styled from "styled-components";

export default function Terms() {
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <TitleText>약관</TitleText>
        </TitleWrapper>
        <ContentWrapper>
          <a href="https://class-cha.notion.site/0bf7635dc1514ae090c87e0af61c3ad9?pvs=4">
            <ContentText>서비스 이용</ContentText>
          </a>
          <a href="https://class-cha.notion.site/ef1aa2a085854b26b616a96562cabaf5?pvs=4">
            <ContentText>개인정보 수집 및 이용</ContentText>
          </a>
          <a href="https://class-cha.notion.site/2182c6752810457c9be4195c61f0dda6?pvs=4">
            <ContentText>개인정보 마케팅 활용</ContentText>
          </a>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

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
