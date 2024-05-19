import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { editDateStateTypes } from "../../type/editSchedule/editDateType";
const { persistAtom } = recoilPersist();

export const editDateState = atom<editDateStateTypes>({
  key: "editDateState",
  default: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    dayOfWeek: "",
  },
  effects_UNSTABLE: [persistAtom],
});
