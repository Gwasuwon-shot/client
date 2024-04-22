import axios from "axios";
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from "../../core/Login/naverPath";

export async function getNaverUserInfo(accessToken: string) {
  const response = await axios.get(`/api/v1/nid/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "plain/text",
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  });
  console.log(response);
  return response.data.response.id;
}
