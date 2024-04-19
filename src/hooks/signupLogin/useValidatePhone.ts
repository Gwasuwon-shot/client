import { useMutation } from "react-query";
import { postValidatePhone } from "../../api/signUp/postValidatePhone";
import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";
import usePostSocialSignup from "./usePostSocialSignup";

interface useValidatePhone {
  successToConfirmCode: () => void;
  WrongCode: () => void;
  newUser: NewSocialUserTypes;
}

export default function useValidatePhone({
  successToConfirmCode,
  WrongCode,
  newUser,
}: useValidatePhone) {
  const postSocialSignUp = usePostSocialSignup(newUser);

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
      postSocialSignUp.mutate();
    },
    onError: () => {
      WrongCode();
    },
  });
  return mutation;
}
