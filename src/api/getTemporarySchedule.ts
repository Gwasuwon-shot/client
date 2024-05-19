import axios from "axios";
import { getCookie } from "./cookie";

interface Day {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface temporaryProp {
  studentName: string;
  subject: string;
  count: number;
  startDate: string;
  regularScheduleList: Day[];
}

export async function getTemporarySchedule(props: temporaryProp) {
  const { studentName, subject, count, startDate, regularScheduleList } = props;

  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/schedule/temporary`,
    {
      studentName: studentName,
      subject: subject,
      count: count,
      startDate: startDate,
      regularScheduleList: regularScheduleList,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data?.data?.data;
}
