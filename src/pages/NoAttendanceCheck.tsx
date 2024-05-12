import EmptyNoAttendance from "../components/noAttendance/EmptyNoAttendance";
import NoAttendanceheader from "../components/noAttendance/NoAttendanceheader";
import NoCheckLesson from "../components/noAttendance/NoCheckLesson";
import useGetMissingAttendanceSchedule from "../hooks/useGetMissingAttendanceSchedule";

export default function NoAttendanceCheck() {
  const { missingAttendanceSchedule } = useGetMissingAttendanceSchedule();

  return (
    <>
      <NoAttendanceheader />
      {missingAttendanceSchedule ? <NoCheckLesson /> : <EmptyNoAttendance />}
    </>
  );
}
