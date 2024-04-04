import { Navigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { stepNum } from "../atom/signup/signup";
import StepRenderer from "../components/signup/StepRenderer";
import { isGuest } from "../utils/common/isLogined";

export default function Signup() {
  const setStep = useSetRecoilState(stepNum);

  if (!isGuest) {
    return <Navigate to="/home" replace />;
  } else {
    setStep(1);
  }

  return (
    <div>
      <StepRenderer />
    </div>
  );
}
