import axios from "axios";

import { getCookie } from "./cookie";

export async function patchLessonParents(lessonCode: string) {
  const data = await axios.patch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/lesson/parents`,
    {
      lessonCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data?.data;
}
