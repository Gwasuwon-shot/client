import axios from "axios";

export async function getKakaoUserInfo(accessToken: string) {
  const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response?.data.id;
}
