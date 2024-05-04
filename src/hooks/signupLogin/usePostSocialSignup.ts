import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { removeCookie, setCookie } from "../../api/cookie";
import { postSocialSignUp } from "../../api/signUp/postSocialSignUp";
import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";
import { isLogin } from "../../utils/common/isLogined";
import { userRoleData } from "./../../atom/loginUser/loginUser";

interface tempSignResType {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    role: "부모님" | "선생님";
  };
}

export default function usePostSocialSignup(newUser: NewSocialUserTypes) {
  const navigate = useNavigate();
  const userRole = useSetRecoilState(userRoleData);

  const setToken = (data: tempSignResType) => {
    removeCookie("tempToken");

    setCookie("accessToken", data.accessToken, {
      secure: true,
      path: "/",
    });

    setCookie("refreshToken", data.refreshToken, {
      secure: true,
      path: "/",
    });

    userRole(data.user.role);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return await postSocialSignUp(newUser);
    },
    onSuccess: (data) => {
      setToken(data.data.data);

      if (isLogin()) {
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
