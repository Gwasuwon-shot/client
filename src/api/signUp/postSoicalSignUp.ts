import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";
import { client } from "../axios";
import { getCookie } from "../cookie";

export async function postSocialSignUp(newUser: NewSocialUserTypes) {
  const { role, name, phone, isMarketing } = newUser;
  const data = await client.post(
    `/api/auth/local/sign-up`,
    {
      role: role,
      name: name,
      phone: phone,
      isMarketing: isMarketing,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
}
