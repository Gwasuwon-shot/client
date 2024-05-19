import { atom } from "recoil";
import { AttendanceLessonType } from "../../type/common/attendanceLessonType";

export const attendanceLesson = atom<AttendanceLessonType>({
  key: "attendanceLesson",
  default: {
    lessonIdx: 0,
    studentName: "",
    count: 0,
    scheduleIdx: 0,
    subject: "",
  },
});
