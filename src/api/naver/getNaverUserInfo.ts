import axios from "axios";

export async function getNaverUserInfo(accessToken: string) {
  const response = await axios.get("/api/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.response.id;
}
