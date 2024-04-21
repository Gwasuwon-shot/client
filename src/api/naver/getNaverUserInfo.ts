import axios from "axios";

export async function getNaverUserInfo(accessToken: string) {
  const response = await axios.get(`https://openapi.naver.com/v1/nid/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  return response;
}
