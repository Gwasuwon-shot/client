import { client } from "../axios";
import { getCookie } from "../cookie";

export async function getCanceledScheduleByLesson(lessonIdx: number) {
  const data = await client.get(`/api/schedule/cancellation/lesson/${lessonIdx}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data?.data?.data;
}
