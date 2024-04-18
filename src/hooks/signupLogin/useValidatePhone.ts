import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postValidatePhone } from "../../api/signUp/postValidatePhone";

interface useValidatePhone {
  successToConfirmCode: () => void;
  WrongCode: () => void;
}

export default function useValidatePhone({
  successToConfirmCode,
  WrongCode,
}: useValidatePhone) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({
      number,
      validCode,
    }: {
      number: string;
      validCode: string;
    }) => {
      return await postValidatePhone({
        number,
        validCode,
      });
    },
    onSuccess: async () => {
      successToConfirmCode();
    },
    onError: () => {
      WrongCode();
    },
  });
  return mutation;
}
