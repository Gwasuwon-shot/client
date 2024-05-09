import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { BackButtonSignupIc } from "../../assets";
import { stepNum } from "../../atom/signup/signup";

export default function BackButton() {
  const [step, setStep] = useRecoilState(stepNum);
  const navigate = useNavigate();

  function handleMoveToBack() {
    setStep(step - 1);
    // navigate(-1);
  }

  return <BackButtonSignupIcon onClick={handleMoveToBack} />;
}

const BackButtonSignupIcon = styled(BackButtonSignupIc)`
  width: 4rem;
  height: 4rem;
  margin-left: -1.4rem;
`;
