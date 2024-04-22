import FirstSwiper from "../components/OnBoarding/FirstSwiper";
import FourthSwiper from "../components/OnBoarding/FourthSwiper";
import SecondSwiper from "../components/OnBoarding/SecondSwiper";
import ThirdSwiper from "../components/OnBoarding/ThirdSwiper";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { BottomButton } from "../components/common";
import { SLIDER_SETTINGS } from "../core/OnBoarding";

export default function OnBoarding() {
  const SwiperPages = [<FirstSwiper />, <SecondSwiper />, <ThirdSwiper />, <FourthSwiper />];

  const handleClickBtn = () => {};

  return (
    <>
      <OnBoardingWrapper>
        <SliderWrapper>
          <Slider {...SLIDER_SETTINGS}>
            {SwiperPages.map((page, idx) => {
              return <article key={idx}>{page}</article>;
            })}
          </Slider>
        </SliderWrapper>
      </OnBoardingWrapper>
      <BottomButton disabled={false} isActive={true} onClick={handleClickBtn}>
        저장
      </BottomButton>
    </>
  );
}

const OnBoardingWrapper = styled.main`
  width: 100%;
`;

const SliderWrapper = styled.section`
  margin-bottom: 5.863rem;

  & > .slick-slider > .slick-dots {
    top: 0; /* 상단에 위치시키기 */
    bottom: auto; /* 기본 위치 해제 */
  }

  & > .slick-slider > .slick-dots > li {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.7rem;
  }

  & > .slick-slider > .slick-dots > li > button {
    width: 0.8rem;
    height: 0.8rem;
  }

  & > .slick-slider > .slick-dots > li > button::before {
    width: 0.8rem;
    height: 0.8rem;

    opacity: 1;

    color: ${({ theme }) => theme.colors.grey200};
  }

  & > .slick-slider > .slick-dots > .slick-active > button::before {
    opacity: 1;

    color: ${({ theme }) => theme.colors.sementic_red};
  }
`;
