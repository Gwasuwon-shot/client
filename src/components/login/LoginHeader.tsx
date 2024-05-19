import { styled } from "styled-components";
import { TuticeWithTextCommonIc } from "../../assets";

export default function LoginHeader() {
  const LOGIN_MAIN_TITLE = "쉬운 수업 관리로 열리는 \n 정확한 나의 ";
  const LOGIN_MAIN_WORD = "결실";

  return (
    <>
      <Title>
        {LOGIN_MAIN_TITLE}
        <Title_WORD>{LOGIN_MAIN_WORD}</Title_WORD>
      </Title>
      <div>
        <TuticeWithTextCommonIcon />
      </div>
    </>
  );
}

const Title = styled.p`
  margin-top: 3.3rem;
  margin-bottom: 0.8rem;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};

  white-space: pre-line;
`;

const Title_WORD = styled.span`
  color: ${({ theme }) => theme.colors.green5};
  ${({ theme }) => theme.fonts.body02};
`;

const TuticeWithTextCommonIcon = styled(TuticeWithTextCommonIc)`
  width: 10rem;
  height: 3.3rem;
  margin-bottom: 1.3rem;
  margin-left: -1.4rem;
  flex-shrink: 0;
`;
