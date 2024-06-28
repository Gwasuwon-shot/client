import { useQuery } from "react-query";

import { getAttendanceExist } from "../api/getAttendanceExist";

export default function useGetAttendanceExist(scheduleIdx: number) {
  const { data: attendanceExist } = useQuery(
    ["getAttendanceExist", scheduleIdx],
    () => getAttendanceExist(scheduleIdx),
    {
      onError: (error) => {
        console.log(error);
      },
      staleTime: 3000,
    },
  );

  return { attendanceExist };
}
