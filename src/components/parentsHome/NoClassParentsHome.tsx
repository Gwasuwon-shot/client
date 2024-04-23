import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { NoClassLogoParentsHomeIc } from "../../assets";
import RoundBottomButton from "../common/RoundBottomButton";

export default function NoClassParentsHome() {
  const navigate = useNavigate();

  function handleMoveToOnboarding() {
    navigate("/on-boarding");
  }

  return (
    <NoClassParentsHomeWrapper>
      <NoClassLogoParentsHomeIcon />

      <NoClassMessage>아직 연결된 수업이 없어요!</NoClassMessage>

      <NoClassSubMessage>
        선생님에게 수업링크를 <br /> 공유받아 연결할 수 있어요
      </NoClassSubMessage>

      <RoundBottomButton buttonMessage="온보딩 구경하기" handleClick={handleMoveToOnboarding} />
    </NoClassParentsHomeWrapper>
  );
}

const NoClassParentsHomeWrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NoClassLogoParentsHomeIcon = styled(NoClassLogoParentsHomeIc)`
  width: 8.4rem;
  margin-top: 4rem;
`;

const NoClassMessage = styled.h2`
  margin-top: 1.5rem;

  ${({ theme }) => theme.fonts.title02};
  color: ${({ theme }) => theme.colors.green6};

  text-align: center;
`;

const NoClassSubMessage = styled.p`
  margin-top: 0.8rem;
  margin-bottom: 6.2rem;

  ${({ theme }) => theme.fonts.body07};
  color: ${({ theme }) => theme.colors.grey700};

  text-align: center;
`;
