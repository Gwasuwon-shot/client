import { useMutation } from "react-query";
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
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      handleLoginToken(data.access_token);
    },
  });
  return mutation;
};

export default useGetLoginToken;
