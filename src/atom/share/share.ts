import { atom } from "recoil";

export const lessonCode = atom<string>({
  key: "lessonCode",
  default: "",
});
