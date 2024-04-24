import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { getLoginAuthToken } from "../../api/kakao/getKakaoAuthToken";
import { getKakaoUserInfo } from "../../api/kakao/getKakaoUserInfo";

interface useGetLoginTokenProps {
  handleLoginToken: (token: string) => void;
}

const useGetLoginToken = (props: useGetLoginTokenProps) => {
  const { handleLoginToken } = props;
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await getLoginAuthToken();
    },
    onError: () => {
      navigate("/");
    },
    onSuccess: async (data) => {
      const UserId = await getKakaoUserInfo(data.access_token);
      handleLoginToken(UserId);
    },
  });
  return mutation;
};

export default useGetLoginToken;
