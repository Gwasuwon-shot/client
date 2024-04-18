import { useRecoilValue } from "recoil";
import { newSocialUser } from "../../atom/signup/signup";
import { client } from "../axios";
import { getCookie } from "../cookie";

export async function postSocialSignUp() {
  const newUser = useRecoilValue(newSocialUser);
  const data = await client.post(`/api/auth/local/sign-up`, newUser, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}
