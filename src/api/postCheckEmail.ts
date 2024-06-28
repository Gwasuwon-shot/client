import axios from "axios";

export async function postCheckEmail(email: string) {
  const data = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/email/duplication`, { email });
  return data;
}
