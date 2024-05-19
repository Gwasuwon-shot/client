import Lottie from "lottie-react";
import styled from "styled-components";
import { LoadingIc } from "../assets";
import loading from "../core/common/loading.json";

export default function Loading() {
  return (
    <LottieWrapper>
      <Lottie loop={true} animationData={loading} style={{ width: "55%", height: "55%" }} />
      <LoadingIcon />
    </LottieWrapper>
  );
}

const LoadingIcon = styled(LoadingIc)`
  width: 5.4rem;
  position: absolute;
`;

const LottieWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
