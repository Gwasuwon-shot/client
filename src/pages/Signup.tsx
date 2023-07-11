import { useState } from "react";
import StepRenderer from "../components/signup/StepRenderer";

export default function Signup() {
  const [step, setStep] = useState(1);
  return (
    <div>
      <StepRenderer step={step} setStep={setStep} />
    </div>
  );
}
