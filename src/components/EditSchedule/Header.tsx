import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RegisterLessonHeaderIc } from "../../assets";

export default function Header() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }
  return (
    <HeaderWrapper>
      <GobackIcon onClick={handleGoBack} />
      <HeaderName> 수업 일정 수정 </HeaderName>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  height: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey50};
`;

const HeaderName = styled.h1`
  display: flex;

  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey900};
`;
const GobackIcon = styled(RegisterLessonHeaderIc)`
  position: absolute;
  top: 0.8rem;
  left: 0;

  width: 4rem;
  height: 4rem;
`;
