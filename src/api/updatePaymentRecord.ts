import axios from "axios";
import { RegisterPaymentTpye } from "../type/manageLesson/registerPaymentType";
import { getCookie } from "./cookie";

export async function updatePaymentRecord(paymentData: RegisterPaymentTpye) {
  const data = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/api/payment-record`, paymentData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data;
}
