import { useRecoilValue } from "recoil";
import StepRenderer from "../components/signup/StepRenderer";
import { newSocialUser } from "../atom/signup/signup";
import { useEffect } from "react";

export default function Signup() {
  const newUSer = useRecoilValue(newSocialUser);
  useEffect(() => {
    console.log(newUSer);
  }, [newUSer]);
  return <StepRenderer />;
}
