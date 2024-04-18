import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postKaKaoSignup } from "../../api/signUp/postKaKaoSignup";
const usePostLoginToken = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      return await postKaKaoSignup(token);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      navigate("/error");
    },
  });
  return mutation;
};

export default usePostLoginToken;
