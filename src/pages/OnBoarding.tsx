import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { OnBoardingFourImg, OnBoardingOneImg, OnBoardingThreeImg, OnBoardingTwoImg } from "../assets";
import { BottomButton } from "../components/common";
import SwiperLayout from "../components/OnBoarding/SwiperLayout";
import { SLIDER_SETTING } from "../core/OnBoarding";
import REACTGA from "react-ga4";

export default function OnBoarding() {
  const sliderRef = useRef<Slider>(null);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const isLastSwiper = step === 3;

  const SwiperPages = [
    <SwiperLayout text={["이번이 몇 회차 수업이지?", "회차별 출결 관리"]} img={OnBoardingOneImg} />,
    <SwiperLayout text={["나무의 성장 과정으로", "수업 회차 진행도 확인"]} img={OnBoardingTwoImg} />,
    <SwiperLayout text={["과외 수업에 100% 집중!", "과외 일정만 한눈에 확인"]} img={OnBoardingThreeImg} />,
    <SwiperLayout text={["과외비 입금 요청은", "알림 전송으로 바로바로"]} img={OnBoardingFourImg} />,
  ];

  const handleAfterChange = (currentSlide: number) => {
    setStep(currentSlide);
  };

  const SLIDER_SETTINGS = {
    ...SLIDER_SETTING,
    afterChange: handleAfterChange,
  };

  const handleClickBtn = () => {
    if (isLastSwiper) {
      navigate("/home");
      REACTGA.event({
        category: "시작하기버튼",
        action: "click",
      });
    } else {
      sliderRef?.current?.slickNext();
    }
  };

  return (
    <>
      <OnBoardingWrapper>
        <SliderWrapper>
          <Slider ref={sliderRef} {...SLIDER_SETTINGS}>
            {SwiperPages.map((page, idx) => {
              return <article key={idx}>{page}</article>;
            })}
          </Slider>
        </SliderWrapper>
      </OnBoardingWrapper>
      <BottomButton disabled={false} isActive={true} onClick={handleClickBtn}>
        {isLastSwiper ? "시작하기" : "다음"}
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
    top: 1.6rem;
    bottom: auto;
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
