import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const selectedDateAtom = atom<Date>({
  key: "selectedDate",
  default: new Date(),
  effects_UNSTABLE: [persistAtom],
});
