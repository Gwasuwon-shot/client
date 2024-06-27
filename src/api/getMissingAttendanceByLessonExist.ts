import axios from "axios";

import { getCookie } from "./cookie";

export async function getMissingAttendanceByLessonExist(lessonIdx: number) {
  const data = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/schedule/lesson/${lessonIdx}/missing-attendance/existence`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data?.data?.data;
}
