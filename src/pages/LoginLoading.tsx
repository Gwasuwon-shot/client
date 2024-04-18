import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetLoginToken from "../hooks/signupLogin/useGetKakao";

export default function LoginLoading() {
  const [auth, setAuth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const handleLoginToken = (token: string) => {
    setAuth(token);
  };

  const getMutation = useGetLoginToken({ handleLoginToken });

  useEffect(() => {
    auth === "" ? getMutation.mutate() : navigate("/signup");
  }, [auth]);

  return <></>;
}
