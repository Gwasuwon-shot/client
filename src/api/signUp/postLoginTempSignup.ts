import { client } from "../axios";

interface postLoginTempSignupProps {
  socialToken: string;
  provider: string;
}

export async function postLoginTempSignup({
  socialToken,
  provider,
}: postLoginTempSignupProps) {
  const response = await client.post(`/api/auth/login`, {
    socialToken: socialToken,
    provider: provider,
  });
  return response.data;
}
