import { useMutation } from "react-query";
import { setCookie } from "../../api/cookie";
import { getLoginAuthToken } from "../../api/kakao/getKakaoAuthToken";

interface useGetLoginTokenProps {
  handleLoginToken: (token: string) => void;
}

const useGetLoginToken = (props: useGetLoginTokenProps) => {
  const { handleLoginToken } = props;

  const mutation = useMutation({
    mutationFn: async () => {
      return await getLoginAuthToken();
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (data) => {
      setCookie("accessToken", data.access_token, {
        secure: true,
      });
      handleLoginToken(data.access_token);
    },
  });
  return mutation;
};

export default useGetLoginToken;
