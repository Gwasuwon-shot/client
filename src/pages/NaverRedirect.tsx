import { useEffect, useState } from "react";
import usePostLoginTempSignup from "../hooks/signupLogin/usePostLoginTempSignup";
import { getNaverUserInfo } from "../api/naver/getNaverUserInfo";

export default function NaverRedirect() {
  const [auth, setAuth] = useState("");

  const postTempSignup = usePostLoginTempSignup();

  useEffect(() => {
    async function fetchAndSetUserInfo() {
      const token = window.location.href.split("=")[1].split("&")[0];
      try {
        const socialId = await getNaverUserInfo(token);
        setAuth(socialId);
      } catch (error) {
        console.error("Failed to fetch Naver user info:", error);
      }
    }

    fetchAndSetUserInfo();
  }, []);

  useEffect(() => {
    if (auth !== "") {
      postTempSignup.mutate({ socialToken: auth, provider: "네이버" });
    }
  }, [auth]);

  return <></>;
}
