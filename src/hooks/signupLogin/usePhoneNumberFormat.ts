import { useState } from "react";

function useFormattedPhoneNumber(): [string, (inputValue: string) => void] {
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");

  const handlePhoneNumberChange = (inputValue: string) => {
    const digits = inputValue.replace(/\D/g, "");
    let formatted = "";

    if (digits.length > 7) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    } else if (digits.length > 3) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      formatted = digits;
    }

    setFormattedPhoneNumber(formatted);
  };

  return [formattedPhoneNumber, handlePhoneNumberChange];
}

export default useFormattedPhoneNumber;
