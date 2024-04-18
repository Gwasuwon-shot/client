import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../api/cookie";
import { postSocialSignUp } from "../../api/signUp/postSoicalSignUp";

export default function usePostSocialSignup() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await postSocialSignUp();
    },
    onSuccess: (data) => {
      console.log(data);
      // data.data.accessToken
      setCookie("accessToken", data.data.accessToken, {
        secure: true,
      });
    },
    onError: (error) => {
      console.log(error);
      navigate("/error");
    },
  });
  return mutation;
}
