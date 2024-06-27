import { useQuery } from "react-query";

import { getMissingAttendanceSchedule } from "../api/getMissingAttendanceSchedule";

export default function useGetMissingAttendanceSchedule() {
  const { data: missingAttendanceSchedule } = useQuery(
    ["getMissingAttendanceSchedule"],
    getMissingAttendanceSchedule,
    {},
  );

  return { missingAttendanceSchedule };
}
