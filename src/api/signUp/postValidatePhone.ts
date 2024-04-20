import { client } from "../axios";

export const postValidatePhone = async ({
  number,
  validCode,
}: {
  number: string;
  validCode: string;
}) => {
  const response = await client.post("/api/auth/phone/validation", {
    phone: number,
    validationNumber: validCode,
  });
  //   return response.data.data;
};
