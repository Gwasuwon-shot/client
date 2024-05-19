import { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { useSetRecoilState } from "recoil";
import { postSendValidationNumber } from "../../api/signUp/postSendValidationNumber";
import { errMessage } from "../../atom/signup/signup";

interface ErrorResponse {
  message: string;
}

export default function useSendValidNumber(
  onSuccess: () => void,
): UseMutationResult<void, AxiosError<ErrorResponse>, string> {
  const setErrMessage = useSetRecoilState(errMessage);

  const mutation = useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: async (number: string) => {
      return await postSendValidationNumber(number);
    },
    onSuccess: () => {
      onSuccess();
      setErrMessage("");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      if (err.response?.data?.message) {
        setErrMessage(err.response.data.message);
      }
    },
  });

  return mutation;
}
