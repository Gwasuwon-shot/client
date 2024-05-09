import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BackButtonSignupIc } from "../../assets";

export default function CommonBackButton({ moveTo }: { moveTo?: string }) {
  const navigate = useNavigate();

  function handleMoveToBack() {
    moveTo ? navigate(`/${moveTo}`) : navigate(-1);
  }

  return <BackButtonSignupIcon onClick={handleMoveToBack} />;
}
const BackButtonSignupIcon = styled(BackButtonSignupIc)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  margin-left: -0.4rem;
`;
