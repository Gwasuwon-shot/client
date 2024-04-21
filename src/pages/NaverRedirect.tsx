import { useEffect, useState } from "react";
import usePostLoginTempSignup from "../hooks/signupLogin/usePostLoginTempSignup";

export default function NaverRedirect() {
  console.log("here");
  const [auth, setAuth] = useState("");

  const postTempSignup = usePostLoginTempSignup();

  useEffect(() => {
    console.log(window.location.href);
    const token = window.location.href.split("=")[1].split("&")[0];
    setAuth(token);

    auth !== "" && postTempSignup.mutate({ socialToken: auth, provider: "네이버" });
  }, [auth]);

  return <></>;
}
