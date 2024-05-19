import axios from "axios";
import { getCookie } from "./cookie";

export async function getMissingMaintenanceExist() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/lesson/missing-maintenance/existence`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data.data.data;
}
