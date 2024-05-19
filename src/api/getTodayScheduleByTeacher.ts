import axios from "axios";
import { getCookie } from "./cookie";

export async function getTodayScheduleByTeacher() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/schedule/today/teacher`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data.data.data;
}
