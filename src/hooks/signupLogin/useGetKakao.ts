import { useMutation } from "react-query";
import { getLoginAuthToken } from "../../api/kakao/getKakaoAuthToken";
import { getKakaoUserInfo } from "../../api/signUp/getKakaoUserInfo";

interface useGetLoginTokenProps {
  handleLoginToken: (token: string) => void;
}

const useGetLoginToken = (props: useGetLoginTokenProps) => {
  const { handleLoginToken } = props;

  const mutation = useMutation({
    mutationFn: async () => {
      return await getLoginAuthToken();
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (data) => {
      const UserId = await getKakaoUserInfo(data.access_token);
      handleLoginToken(UserId);
    },
  });
  return mutation;
};

export default useGetLoginToken;
