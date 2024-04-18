import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { removeCookie, setCookie } from "../../api/cookie";
import { postSocialSignUp } from "../../api/signUp/postSoicalSignUp";
import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";

export default function usePostSocialSignup(newUser: NewSocialUserTypes) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await postSocialSignUp(newUser);
    },
    onSuccess: (data) => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      console.log(data);
      setCookie("accessToken", data.data.accessToken, {
        secure: true,
      });
      setCookie("refreshToken", data.data.refreshToken, {
        secure: true,
      });
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      navigate("/error");
    },
  });
  return mutation;
}
