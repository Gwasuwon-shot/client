import { atom } from "recoil";

export const connectLessonId = atom<string>({
  key: "connectLessonId",
  default: "",
});

export const parentsPhoneState = atom<string>({
  key: "parentsPhoneState",
  default: "010-1234-1234",
});
