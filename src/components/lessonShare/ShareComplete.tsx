import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackButtonSignupIc, CheckLargeIcon } from "../../assets";
import { BottomButton } from "../common";

import REACTGA from "react-ga4";

export default function ShareComplete({ handleMoveToPage }: { handleMoveToPage: (page: string) => void }) {
  const navigate = useNavigate();

  function handleOnClickToHome() {
    navigate("/home");
    REACTGA.event({
      category: "홈으로가기",
      action: "GotoHome",
    });
  }

  return (
    <>
      <BackButtonSignupIcon onClick={() => handleMoveToPage("M")} />
      <Wrapper>
        <CheckIcon />
        <Title>초대장 발송이 완료되었어요!</Title>
        <SubTitle>
          학부모님이 전화번호를 등록하시면 <br /> 자동으로 등록될거에요
        </SubTitle>
      </Wrapper>
      <BottomButton type="submit" onClick={() => handleOnClickToHome()} isActive={true} disabled={false}>
        홈으로 가기
      </BottomButton>
    </>
  );
}

const Wrapper = styled.main`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(CheckLargeIcon)`
  width: 8.7rem;
  height: 8.7rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.green5};

  /* TODO 테마 폰트로 변경 */
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.6rem;
`;

const SubTitle = styled.h2`
  margin-top: 0.8rem;
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body06};
`;
const BackButtonSignupIcon = styled(BackButtonSignupIc)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  margin-left: -0.4rem;
`;
