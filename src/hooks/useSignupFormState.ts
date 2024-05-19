import { useState } from "react";

export default function useSignupFormState() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  return {
    name,
    setName,
    email,
    setEmail,
    isName,
    setIsName,
    isEmail,
    setIsEmail,
    isActive,
    setIsActive,
    nameFocus,
    setNameFocus,
    emailFocus,
    setEmailFocus,
    modalMessage,
    setModalMessage,
    modalOpened,
    setModalOpened,
  };
}
