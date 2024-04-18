// src/hooks/useSocialLogin.js
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../api/cookie";
import { postLoginTempSignup } from "../../api/signUp/postLoginTempSignup";

interface usePostLoginTempSignupProps {
  socialToken: string;
  provider: string;
}

export default function usePostLoginTempSignup() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({
      socialToken,
      provider,
    }: usePostLoginTempSignupProps) => {
      return await postLoginTempSignup({
        socialToken,
        provider,
      });
    },
    onSuccess: (data) => {
      setCookie("accessToken", data.data.accessToken, {
        secure: true,
      });
      setCookie("refreshToken", data.data.refreshToken, {
        secure: true,
      });
      navigate("/signup");
    },
    onError: (error) => {
      navigate("/error");
    },
  });
  return mutation;
}
