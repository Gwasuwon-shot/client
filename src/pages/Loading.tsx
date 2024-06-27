import Lottie from "lottie-react";
import { useEffect } from "react";
import styled from "styled-components";

import { LoadingIc } from "../assets";
import loading from "../core/common/loading.json";

export default function Loading() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 8000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <LottieWrapper>
      <Lottie loop animationData={loading} style={{ width: "55%", height: "55%" }} />
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
