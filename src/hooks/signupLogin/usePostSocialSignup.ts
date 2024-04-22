import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getCookie, setCookie } from "../../api/cookie";
import { postSocialSignUp } from "../../api/signUp/postSoicalSignUp";
import { userRoleData } from "../../atom/loginUser/loginUser";
import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";

export default function usePostSocialSignup(newUser: NewSocialUserTypes) {
  const navigate = useNavigate();
  const userRole = useSetRecoilState(userRoleData);

  const mutation = useMutation({
    mutationFn: async () => {
      return await postSocialSignUp(newUser);
    },
    onSuccess: (data) => {
      userRole(data.data.user.role);
      setCookie("accessToken", data.data.accessToken, {
        secure: true,
      });
      setCookie("refreshToken", data.data.refreshToken, {
        secure: true,
      });

      if (getCookie("accessToken") !== "") {
        navigate("/home");
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/error");
    },
  });
  return mutation;
}
