import { atom } from "recoil";

export const connectLessonId = atom<string>({
  key: "connectLessonId",
  default: "",
});

export const parentsPhoneState = atom<string | undefined>({
  key: "parentsPhoneState",
  default: undefined,
});
