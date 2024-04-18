import { useEffect, useState } from "react";
import useGetLoginToken from "../hooks/signupLogin/useGetKakao";
import usePostLoginTempSignup from "../hooks/signupLogin/usePostLoginTempSignup";

export default function LoginLoading() {
  // auth 리코일에 담기
  const [auth, setAuth] = useState("");

  useEffect(() => {
    console.log(auth);
  }, [auth]);

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

  return <></>;
}
