import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";
import { client } from "../axios";
import { getCookie } from "../cookie";

export async function postSocialSignUp(newUser: NewSocialUserTypes) {
  const data = await client.post(`/api/auth/local/sign-up`, newUser, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}
