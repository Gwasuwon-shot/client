import { atom } from "recoil";
import { AttendanceLessonType } from "../../type/common/attendanceLessonType";

export const deleteLessonStatus = atom<number>({
  key: "deleteLessonStatus",
  default: 0,
});
