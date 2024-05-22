import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { RegisterLessonHeaderIc } from "../../assets";
import { cycleNumberState } from "../../atom/timePicker/timePicker";
import ProgressBar from "../common/ProgressBar";
import CustomBackButton from "../common/CustomBackButton";

export default function Header() {
  const navigate = useNavigate();
  const [activeCycleSlide, setActiveCycleSlide] = useRecoilState(cycleNumberState);

  function handleMoveToBack() {
    setActiveCycleSlide(0);
    navigate(-1);
  }

  return (
    <HeaderWrapper>
      <CustomBackButton onClick={handleMoveToBack} />
      <ProgressBar progress={33.2} />
      <InputHeader>
        총 몇 회차로 이루어진 <br /> 수업인가요?
      </InputHeader>
      <InputNotice>
        수업비를 받는 기준으로 진행되는 <br /> 회차를 알려주세요
      </InputNotice>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;

  height: 15.8rem;
  margin-top: 2rem;
`;

const InputHeader = styled.h1`
  display: flex;

  margin-top: 2.2rem;
  margin-left: 1.6rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const InputNotice = styled.h2`
  display: flex;

  margin-top: 1.1rem;
  margin-left: 1.6rem;

  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;
