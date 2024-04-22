import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { styled } from "styled-components";

import { useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { getCookie, setCookie } from "../api/cookie";
import { KakaoDefaultLoginIc, KakaoUsedLoginIc, NaverDefaultLoginIc, NaverUsedLoginIc } from "../assets";
import FirstSwiper from "../components/OnBoarding/FirstSwiper";
import FourthSwiper from "../components/OnBoarding/FourthSwiper";
import SecondSwiper from "../components/OnBoarding/SecondSwiper";
import ThirdSwiper from "../components/OnBoarding/ThirdSwiper";
import { KAKAO_AUTH_URL } from "../core/Login/kakaoPath";
import { NAVER_CLIENT_ID, NAVER_REDIRECT_URI } from "../core/Login/naverPath";
import { SLIDER_SETTINGS } from "../core/OnBoarding";
import { isGuest } from "../utils/common/isLogined";

export default function Landing() {
  const naverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.naver) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: NAVER_REDIRECT_URI,
        callbackHandle: true,
        loginButton: {
          color: "black",
          type: 1,
        },
      });
      naverLogin.init();
    }
  }, []);

  const navigateToKaKao = () => {
    setCookie("lastLogin", "kakao", {
      secure: true,
    });

    window.location.href = KAKAO_AUTH_URL;
  };

  const navigateToNaver = () => {
    setCookie("lastLogin", "naver", {
      secure: true,
    });

    (naverRef.current?.children[0] as HTMLElement)?.click();
  };

  const lastLogin = getCookie("lastLogin");

  if (!isGuest) {
    return <Navigate to="/home" replace />;
  }
  const SwiperPages = [<FirstSwiper />, <SecondSwiper />, <ThirdSwiper />, <FourthSwiper />];

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
          <NaverLoginFeat ref={naverRef} id="naverIdLogin">
            네이버 테스트
          </NaverLoginFeat>
          {lastLogin === "naver" ? (
            <NaverUsedLogin onClick={navigateToNaver} />
          ) : (
            <NaverLogin onClick={navigateToNaver} />
          )}
          {lastLogin === "kakao" ? (
            <KakaoUsedLogin onClick={navigateToKaKao} />
          ) : (
            <KakaoLogin onClick={navigateToKaKao} />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const GoToLoginMessage = styled.p`
  display: flex;
  justify-content: center;

  margin-top: 2rem;

  ${({ theme }) => theme.fonts.body07};

  color: #7c7e7e;

  > a {
    color: ${({ theme }) => theme.colors.grey900};
  }
`;

const NaverLogin = styled(NaverDefaultLoginIc)`
  width: 80%;
  height: 100%;
`;

const NaverUsedLogin = styled(NaverUsedLoginIc)`
  width: 80%;
  height: 100%;
`;

const KakaoLogin = styled(KakaoDefaultLoginIc)`
  width: 80%;
  height: 100%;
`;

const KakaoUsedLogin = styled(KakaoUsedLoginIc)`
  width: 80%;
  height: 100%;
`;

const NaverLoginFeat = styled.div`
  display: none;
`;
