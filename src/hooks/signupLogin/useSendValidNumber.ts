import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postSendValidationNumber } from "../../api/signUp/postSendValidationNumber";

export default function useSendValidNumber(onSuccess: () => void) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (number: string) => {
      return await postSendValidationNumber(number);
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      navigate("/error");
    },
  });
  return mutation;
}
