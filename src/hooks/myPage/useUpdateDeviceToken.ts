import { useMutation, useQueryClient } from "react-query";
import { patchDeviceToken } from "../../api/myPage/patchDeviceToken";

export default function useUpdateDeviceToken() {
  const queryClient = useQueryClient();
  const { mutate: updateDeviceToken } = useMutation(patchDeviceToken, {
    onSuccess: () => {
      queryClient.invalidateQueries("notificationStatus");
    },
    onError: (err) => console.log(err),
  });
  return updateDeviceToken;
}
