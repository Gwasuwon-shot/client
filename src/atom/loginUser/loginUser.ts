import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userRoleData = atom<string>({
  key: "userRoleData",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
