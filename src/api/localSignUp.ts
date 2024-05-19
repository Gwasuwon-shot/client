import axios from "axios";
import { NewUserDataTypes } from "../type/SignUp/newUserDataType";

export async function newUserPost(newUser: NewUserDataTypes) {
  const data = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/auth/local/sign-up`,
    newUser,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
