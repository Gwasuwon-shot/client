import { client } from "../axios";
import { getCookie } from "../cookie";

export async function deleteSchedule(scheduleIdx: number) {
  const data = await client.delete(
    `/api/schedule/${scheduleIdx}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data;
}
