import axios from "axios";

const URL = `/proxy/v1/`;

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});


export async function getNaverUserInfo(accessToken: string) {
  try {
    const response = await api.get(`nid/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    if (response.data && response.data.response) {
      return response.data.response.id;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return null;
  }
}
