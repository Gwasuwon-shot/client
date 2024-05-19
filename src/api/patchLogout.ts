import axios from "axios";
import { getCookie } from "./cookie";

export async function patchLogout() {
  const data = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/api/user/logout`, null, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}
