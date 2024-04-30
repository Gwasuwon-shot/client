import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../api/cookie";
import { postSocialSignUp } from "../../api/signUp/postSocialSignUp";
import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";
import { isCookieAuthenticated, isCookieNull, isLogin } from "../../utils/common/isLogined";

export default function usePostSocialSignup(newUser: NewSocialUserTypes) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await postSocialSignUp(newUser);
    },
    onSuccess: (data) => {
      setCookie("accessToken", data.data.accessToken, {
        secure: true,
      });
      setCookie("refreshToken", data.data.refreshToken, {
        secure: true,
      });

      if (isLogin() && !isCookieNull() && !isCookieAuthenticated()) {
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/error");
    },
  });
  return mutation;
}
