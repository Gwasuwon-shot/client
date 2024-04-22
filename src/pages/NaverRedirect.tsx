import { useEffect, useState } from "react";
import { getNaverUserInfo } from "../api/naver/getNaverUserInfo";
import usePostLoginTempSignup from "../hooks/signupLogin/usePostLoginTempSignup";

export default function NaverRedirect() {
  const [auth, setAuth] = useState("");

  const postTempSignup = usePostLoginTempSignup();

  useEffect(() => {
    async function fetchAndSetUserInfo() {
      const token = window.location.href.split("=")[1].split("&")[0];
      console.log(token);
      try {
        const socialId = await getNaverUserInfo(token);
        setAuth(socialId);
      } catch (error) {
        console.error("Failed to fetch Naver user info:", error);
      }
    }

    if (window.location.href) {
      fetchAndSetUserInfo();
    }
  }, []);

  useEffect(() => {
    if (auth !== "") {
      postTempSignup.mutate({ socialToken: auth, provider: "네이버" });
    }
  }, [auth]);

  return <></>;
}
