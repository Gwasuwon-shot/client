import { useQuery } from "react-query";
import { getNotificationStatus } from "../../api/myPage/getNotificationStatus";

export default function useGetNotificationStatus() {
  const { data, error } = useQuery("notificationStatus", getNotificationStatus, {
    enabled: true,
    select: (data) => data?.code === 200,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return false;
  }

  return data;
}
