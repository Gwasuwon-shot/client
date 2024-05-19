import { useState } from "react";
import { useQuery } from "react-query";
import { getNotificationStatus } from "../../api/myPage/getNotificationStatus";

export default function useGetNotificationStatus() {
  const [isAllow, setIsAllow] = useState(false);

  useQuery("notificationStatus", getNotificationStatus, {
    onSuccess: (data) => {
      if (data?.code === 200) {
        setIsAllow(true);
      } else if (data?.code == 403) {
        setIsAllow(false);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return isAllow;
}
