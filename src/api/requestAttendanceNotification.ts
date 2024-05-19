import axios from "axios";
import { getCookie } from "./cookie";

export async function requestAttendanceNotification(scheduleIdx: number) {
  const data = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/notification/schedule/${scheduleIdx}/attendance`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data;
}
