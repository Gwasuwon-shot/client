import { client } from "../axios";

export const postKaKaoSignup = async (token: string) => {
  const response = await client.post(
    "/api/login",
    {
      socialPlatform: "KAKAO",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
