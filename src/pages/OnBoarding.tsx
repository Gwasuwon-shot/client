import FirstSwiper from "../components/OnBoarding/FirstSwiper";
import FourthSwiper from "../components/OnBoarding/FourthSwiper";
import SecondSwiper from "../components/OnBoarding/SecondSwiper";
import ThirdSwiper from "../components/OnBoarding/ThirdSwiper";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { styled } from "styled-components";
import { SLIDER_SETTINGS } from "../core/OnBoarding";

import { Link, Navigate } from "react-router-dom";
import RoundBottomButton from "../components/common/RoundBottomButton";
import { isGuest } from "../utils/common/isLogined";

export default function OnBoarding() {
  const SwiperPages = [<FirstSwiper />, <SecondSwiper />, <ThirdSwiper />, <FourthSwiper />];

  if (!isGuest) {
    return <Navigate to="/home" replace />;
  }

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

        <ButtonWrapper>
          <Link to="/signup">
            <RoundBottomButton buttonMessage="시작하기" />
          </Link>
        </ButtonWrapper>

        <DividingLine />

        <GoToLoginMessage>
          이미 계정이 있으신가요? 바로&nbsp;<Link to="/login">로그인 하기</Link>
        </GoToLoginMessage>
      </OnBoardingWrapper>
    </>
  );
}

const OnBoardingWrapper = styled.main`
  width: 100%;
`;

const SliderWrapper = styled.section`
  margin-bottom: 5.863rem;

  & > .slick-slider > .slick-dots {
    bottom: -2.863rem;
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

    color: ${({ theme }) => theme.colors.green5};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GoToLoginMessage = styled.p`
  display: flex;
  justify-content: center;

  margin-top: 2rem;

  ${({ theme }) => theme.fonts.body02};

  color: #7c7e7e;

  > a {
    color: ${({ theme }) => theme.colors.green5};
  }
`;

const DividingLine = styled.hr`
  width: 83.75%;
  height: 0.1rem;
  background-color: #f4f4f4;
  border: 0;
`;
