import axios from "axios";

import { getCookie } from "./cookie";

export async function deleteLesson(lessonIdx: number) {
  const data = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/api/lesson/${lessonIdx}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data;
}
