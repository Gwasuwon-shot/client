import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorShowingIc } from "../assets";
import RoundBottomButton from "../components/common/RoundBottomButton";

interface ErrorProps {
  resetErrorBoundary: any;
  // error: any;
}

export default function ErrorPage(prop: ErrorProps) {
  const { resetErrorBoundary } = prop;
  const navigate = useNavigate();

  function handleMoveToHome() {
    resetErrorBoundary();
    navigate("/");
  }

  return (
    <ErrorWrapper>
      <ErrorShowingIcon />
      <ErrorTitle>
        죄송합니다 <br />
        오류가 발생했어요
      </ErrorTitle>
      <ErrorSub>
        주소가 잘못 입력되거나
        <br />
        변경 혹은 삭제되어 페이지를 찾을 수 없어요
      </ErrorSub>
      <ButtonWrapper>
        <RoundBottomButton buttonMessage="홈으로 가기" handleClick={() => handleMoveToHome} />
      </ButtonWrapper>
    </ErrorWrapper>
  );
}

const ErrorShowingIcon = styled(ErrorShowingIc)`
  margin-bottom: 3.8rem;
  width: 10rem;
  height: 10rem;
`;

const ErrorTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  ${({ theme }) => theme.fonts.title01}

  margin-bottom: 1.5rem;
`;

const ErrorSub = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey400};
  ${({ theme }) => theme.fonts.body04};
`;

const ErrorWrapper = styled.section`
  padding-top: 6.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;

  bottom: 2.2rem;
`;
