import { NewSocialUserTypes } from "../../type/SignUp/newUserDataType";
import { client } from "../axios";
import { getCookie, removeCookie } from "../cookie";

export async function postSocialSignUp(newUser: NewSocialUserTypes) {
  const { role, name, phone, isMarketing } = newUser;
  const data = await client.post(
    `/api/user/sign-up`,
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
  removeCookie("status");
  return data;
}
