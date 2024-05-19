import { atom } from "recoil";

export const agreeSend = atom<undefined | string>({
  key: "agreeSend",
  default: undefined,
});
