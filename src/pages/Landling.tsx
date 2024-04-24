import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { styled } from "styled-components";

import { useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { getCookie, setCookie } from "../api/cookie";
import {
  KakaoDefaultLoginIc,
  KakaoUsedLoginIc,
  LandingTreesIc,
  NaverDefaultLoginIc,
  NaverUsedLoginIc,
  TuticeWithTextCommonIc,
} from "../assets";
import { KAKAO_AUTH_URL } from "../core/Login/kakaoPath";
import { NAVER_CLIENT_ID, NAVER_REDIRECT_URI } from "../core/Login/naverPath";
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

    if (naverRef.current && naverRef.current.children[0]) {
      (naverRef.current.children[0] as HTMLElement).click();
    }
  };

  const lastLogin = getCookie("lastLogin");

  if (!isGuest) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <OnBoardingWrapper>
        <ImageWrapper>
          <TitleWrapper>
            <FirstSwiperTitle>
              쉬운 수업 관리로 열리는 <br /> 정확한 나의 결실
            </FirstSwiperTitle>
            <UITextLogo />
          </TitleWrapper>
          <LandingTreesIcon />
        </ImageWrapper>

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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 3rem;
`;

const ImageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 29rem;
  background-color: ${({ theme }) => theme.colors.green1};
`;

const LandingTreesIcon = styled(LandingTreesIc)`
  position: absolute;
  bottom: 0;
  height: 7rem;
  width: 100%;
`;

const UITextLogo = styled(TuticeWithTextCommonIc)`
  width: 100%;
  height: 5rem;
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstSwiperTitle = styled.h1`
  width: 100%;
  text-align: center;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};
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

  margin-top: 0.6rem;

  ${({ theme }) => theme.fonts.caption01};

  color: ${({ theme }) => theme.colors.grey400};

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
