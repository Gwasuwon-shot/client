import { styled } from "styled-components";
import { BackButtonSignupIc } from "../../assets";

export default function CustomBackButton({ onClick }: { onClick: () => void }) {
  return <BackButtonSignupIcon onClick={onClick} />;
}
const BackButtonSignupIcon = styled(BackButtonSignupIc)`
  width: 4rem;
  height: 4rem;
  margin-left: -0.4rem;
`;
