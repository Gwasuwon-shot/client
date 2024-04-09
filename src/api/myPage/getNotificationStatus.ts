// api/myPage/getNotificationStatus.js
import { client } from "../axios";
import { getCookie } from "../cookie";

export async function getNotificationStatus() {
  try {
    const response = await client.get(`/api/user/notification`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
