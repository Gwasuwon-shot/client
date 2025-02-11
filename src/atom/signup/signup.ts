import { atom } from "recoil";
import { NewSocialUserTypes, NewUserDataTypes } from "../../type/SignUp/newUserDataType";

export const stepNum = atom<number>({
  key: "stepNum",
  default: 1,
});

export const newUserData = atom<NewUserDataTypes>({
  key: "newUserData",
  default: { role: "", email: "", password: "", name: "", isMarketing: false },
});

export const newSocialUser = atom<NewSocialUserTypes>({
  key: "newSocialUser",
  default: { role: "", name: "", phone: "", isMarketing: true },
});

export const errMessage = atom<string>({
  key: "errMessage",
  default: "",
});
