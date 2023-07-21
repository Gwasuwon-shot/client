import { Cookies } from "react-cookie";
import { newUserData } from "../atom/signup/signup";

const cookies = new Cookies();

export const setCookie = (name: string, value: string | undefined, options: object) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
