import { useEffect, useState } from "react";

import useGetLoginToken from "../hooks/signupLogin/useGetKakao";
import usePostLoginTempSignup from "../hooks/signupLogin/usePostLoginTempSignup";
import Loading from "./Loading";

export default function KakaoRedirect() {
  const [auth, setAuth] = useState("");

  const handleLoginToken = (token: string) => {
    setAuth(token);
  };

  const getMutation = useGetLoginToken({ handleLoginToken });
  const postTempSignup = usePostLoginTempSignup();

  useEffect(() => {
    auth === ""
      ? getMutation.mutate()
      : postTempSignup.mutate({ socialToken: auth, provider: "카카오" });
  }, [auth]);

  return <Loading/>;
}
