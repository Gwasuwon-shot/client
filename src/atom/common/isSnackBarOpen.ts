import { atom } from "recoil";

export const isSnackBarOpen = atom<boolean>({
  key: "isSnackBarOpen",
  default: false,
});
