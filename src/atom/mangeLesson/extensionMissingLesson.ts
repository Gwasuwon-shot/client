import { atom } from "recoil";

interface extensionMissingLessonType {
  studentName: string;
  subject: string;
  lessonIdx: number;
}

export const extensionMissingLesson = atom<extensionMissingLessonType>({
  key: "extensionMissingLesson",
  default: {
    lessonIdx: 0,
    studentName: "",
    subject: "",
  },
});
