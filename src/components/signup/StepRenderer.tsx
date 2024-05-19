import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getCookie } from "../../api/cookie";
import { stepNum } from "../../atom/signup/signup";
import Role from "./Role";
import UserName from "./UserName";
import UserPhone from "./UserPhone";

export default function StepRenderer() {
  const step = useRecoilValue(stepNum);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!getCookie("tempToken")) {
      navigate('/')
    }},[])

  switch (step) {
    case 0:
      navigate(-1);
      break;
    case 1:
      return <Role />; //0
    case 2:
      return <UserName />; //25
    case 3:
      return <UserPhone />; //50 | 75
  }
}
