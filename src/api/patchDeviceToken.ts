import axios from "axios";
import { getCookie } from "./cookie";

export async function patchDeviceToken(token: string | null) {
  const data = await axios.patch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/user/device-token`,
    { deviceToken: token },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data;
}
