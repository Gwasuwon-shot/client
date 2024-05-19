import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const editLessonIdxState = atom<number>({
  key: "editLessonIdxState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
