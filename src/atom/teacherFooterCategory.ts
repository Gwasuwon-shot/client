import { atom } from "recoil";
import { TEACHER_FOOTER } from "../core/teacherHome/teacherFooter";
import { TeacherFooterType } from "../type/teacherHome/teacherFooterType";

export const teacherFooterCategory = atom<TeacherFooterType[]>({
  key: "teacherFooterCategory",
  default: TEACHER_FOOTER,
});
