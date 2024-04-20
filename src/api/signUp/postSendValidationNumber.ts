import { client } from "../axios";

export const postSendValidationNumber = async (number: string) => {
  const response = await client.post("/api/auth/phone", {
    phone: number,
  });
  return response.data.data;
};
