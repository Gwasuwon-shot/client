import axios from "axios";

import { getCookie } from "./cookie";

export async function getDepositRecord(lessonId: number) {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/payment-record/lesson/${lessonId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data?.data?.data;
}
