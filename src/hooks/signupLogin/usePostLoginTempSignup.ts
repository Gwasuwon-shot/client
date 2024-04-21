// src/hooks/useSocialLogin.js
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { removeCookie, setCookie } from "../../api/cookie";
import { postLoginTempSignup } from "../../api/signUp/postLoginTempSignup";
import { useSetRecoilState } from "recoil";
import { userRoleData } from "../../atom/loginUser/loginUser";

interface usePostLoginTempSignupProps {
  socialToken: string;
  provider: string;
}

interface tempSignResType {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    role: "부모님" | "선생님";
  };
}

export default function usePostLoginTempSignup() {
  const navigate = useNavigate();
  const setUserRole = useSetRecoilState(userRoleData);

  const setTempToken = (data: tempSignResType) => {
    setCookie("tempToken", data.accessToken, {
      secure: true,
    });
  };

  const setToken = (data: tempSignResType) => {
    removeCookie("tempToken");

    setCookie("accessToken", data.accessToken, {
      secure: true,
      path: "/",
    });

    // setCookie("refreshToken", data.refreshToken, {
    //   secure: true,
    //   path: "/",
    // });
  };

  const mutation = useMutation({
    mutationFn: async ({ socialToken, provider }: usePostLoginTempSignupProps) => {
      return await postLoginTempSignup({
        socialToken,
        provider,
      });
    },
    onSuccess: (data) => {
      console.log(data.data.user.role);
      setUserRole(data.data.user.role);
      if (data.code === 200) {
        setToken(data.data);
        navigate("/home");
      } else {
        setTempToken(data.data);
        navigate("/signup");
      }
    },
    onError: () => {
      console.error();
      navigate("/error");
    },
  });
  return mutation;
}
