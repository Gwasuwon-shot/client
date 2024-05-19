import axios from "axios";
import { getCookie } from "./cookie";

export async function getTodayDate() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/today`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data?.data?.data;
}
