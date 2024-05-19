import axios from "axios";
import { getCookie } from "./cookie";

export async function getLessonProgress(lessonIdx: number) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/lesson/${lessonIdx}/progress`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data?.data.data;
}
