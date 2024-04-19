import FirstSwiper from "../components/OnBoarding/FirstSwiper";
import FourthSwiper from "../components/OnBoarding/FourthSwiper";
import SecondSwiper from "../components/OnBoarding/SecondSwiper";
import ThirdSwiper from "../components/OnBoarding/ThirdSwiper";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { styled } from "styled-components";
import { SLIDER_SETTINGS } from "../core/OnBoarding";

import { Link } from "react-router-dom";
import { getCookie } from "../api/cookie";
import {
  KakaoDefaultLoginIc,
  KakaoUsedLoginIc,
  NaverDefaultLoginIc,
  NaverUsedLoginIc,
} from "../assets";
import { KAKAO_AUTH_URL } from "../core/Login/kakaoPath";

export default function OnBoarding() {
  const naviagateToKaKao = () => {
    window.location.href = KAKAO_AUTH_URL;
    // loginTempSignUp({ socialToken: "", provider: "카카오" });
  };

  const lastLogin = getCookie("lastLogin");

  const SwiperPages = [
    <FirstSwiper />,
    <SecondSwiper />,
    <ThirdSwiper />,
    <FourthSwiper />,
  ];

  // if (!isGuest) {
  //   return <Navigate to="/home" replace />;
  // }
  // if (!isGuest) {
  //   return <Navigate to="/home" replace />;
  // }

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
          {lastLogin === "naver" ? <NaverUsedLogin /> : <NaverLogin />}
          {lastLogin === "kakao" ? (
            <KakaoUsedLogin onClick={naviagateToKaKao} />
          ) : (
            <KakaoLogin />
          )}
        </ButtonWrapper>

        <GoToLoginMessage>
          계속함으로써&nbsp;<Link to="/">이용약관</Link>&nbsp;및&nbsp;
          <Link to="/">개인정보처리방침</Link>에 동의합니다
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
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const GoToLoginMessage = styled.p`
  display: flex;
  justify-content: center;

  margin-top: 2rem;

  ${({ theme }) => theme.fonts.body02};

  color: #7c7e7e;

  > a {
    color: ${({ theme }) => theme.colors.grey900};
  }
`;

const NaverLogin = styled(NaverDefaultLoginIc)`
  width: 100%;
  height: 100%;
`;

const NaverUsedLogin = styled(NaverUsedLoginIc)`
  width: 100%;
  height: 100%;
`;

const KakaoLogin = styled(KakaoDefaultLoginIc)`
  width: 100%;
  height: 100%;
`;

const KakaoUsedLogin = styled(KakaoUsedLoginIc)`
  width: 100%;
  height: 100%;
`;
