import axios from "axios";

import { getCookie } from "./cookie";

export async function getMissingAttendanceSchedule() {
  const data = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/schedule/missing-attendance`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data.data.data.missingAttendanceList;
}
