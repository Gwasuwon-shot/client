import axios from "axios";
import { getCookie } from "./cookie";

export async function getLessonRegularSchedule(lessonIdx: number) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/lesson/${lessonIdx}/regular-schedule`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data?.data?.data.regularScheduleList;
}
