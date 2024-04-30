import { client } from "../axios";


export async function getNaverUserInfo(accessToken: string) {
    const response = await client.post(`/api/auth/naver`, {
      naverToken: accessToken,
    });
      return response.data.data.response;
}
