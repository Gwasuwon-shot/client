import axios from "axios";

import { getCookie } from "./cookie";

export async function getMissingMaintenanceLesson() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/lesson/missing-maintenance`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data?.data?.data?.missingMaintenanceLessonList;
}
