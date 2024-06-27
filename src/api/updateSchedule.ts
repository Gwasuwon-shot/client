import axios from "axios";

import { getCookie } from "./cookie";

interface updateScheduleType {
  idx: number;
  date: string;
  startTime: string;
  endTime: string;
}

export async function updateSchedule(scheduleData: updateScheduleType) {
  const { idx, date, startTime, endTime } = scheduleData;

  const data = await axios.patch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/schedule`,
    {
      schedule: {
        idx,
        date,
        startTime,
        endTime,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data;
}
