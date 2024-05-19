import axios from "axios";
import { userLoginTypes } from "../type/login/userLoginType";

export async function postLocalLogin(userLogin: userLoginTypes) {
  const data = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/local/login`, userLogin, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
