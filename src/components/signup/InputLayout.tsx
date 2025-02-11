import React, { useState } from "react";
import { styled } from "styled-components";
import { RemoveInputIc } from "../../assets";
import { PHONE_NUMBER_REGEX } from "../../core/signup/regex";
import useFormattedPhoneNumber from "../../hooks/signupLogin/usePhoneNumberFormat";
import CheckButton from "./CheckButton";
import CountdownTimer from "./CountdownTimer";
import TextLabel from "./TextLabel";

interface InputFieldLayoutProps {
  labelText: string;
  placeholder: string;
  onInputChange: (value: string) => void;
  type: "text" | "number" | "tel";
}

interface InputBtnLayoutProps extends InputFieldLayoutProps {
  onClickButton: () => void;
  buttonText: string;
}

interface InputTimerLayoutProps extends InputFieldLayoutProps {}

export default function InputLayout({ labelText, placeholder, onInputChange, type }: InputFieldLayoutProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useFormattedPhoneNumber();

  const isPhone = type === "tel";

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onInputChange(value);
    setInputValue(value);
    setIsExist(true);
    isPhone && setPhoneNumber(value);
  }

  function handleClickReset() {
    onInputChange("");
    setPhoneNumber("");
    setInputValue("");
    setIsExist(false);
  }

  return (
    <>
      <InputNameWrapper>
        <TextLabel>{labelText}</TextLabel>
        <InputCover $isExist={isExist} $isFocused={isFocused}>
          <InputField
            value={isPhone ? phoneNumber : inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            type={type}
            placeholder={placeholder}
            maxLength={isPhone ? 13 : 50}
          />
          <RemoveInputIcon $isExist={isExist} onClick={handleClickReset} />
        </InputCover>
      </InputNameWrapper>
    </>
  );
}

export function InputBtnLayout({
  labelText,
  placeholder,
  onInputChange,
  onClickButton,
  buttonText,
  type,
}: InputBtnLayoutProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [phoneNumber, setPhoneNumber] = useFormattedPhoneNumber();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsExist(true);
    const { value } = e.target;
    onInputChange(value);
    if (type === "tel") {
      setPhoneNumber(value);
    }
  }

  function handleClickReset() {
    setPhoneNumber("");
    onInputChange("");
    setIsExist(false);
  }

  return (
    <InputNameWrapper>
      <TextLabel>{labelText}</TextLabel>
      <EmailCheckButtonWrapper>
        <InputCover $isExist={isExist} $isFocused={isFocused}>
          <InputField
            value={phoneNumber}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            type={type}
            placeholder={placeholder}
            maxLength={13}
          />
          <RemoveInputIcon $isExist={isExist} onClick={handleClickReset} />
        </InputCover>
        <CheckButton text={buttonText} isActive={PHONE_NUMBER_REGEX.test(phoneNumber)} onClick={onClickButton} />
      </EmailCheckButtonWrapper>
    </InputNameWrapper>
  );
}

export function InputTimerLayout({ labelText, placeholder, onInputChange, type }: InputTimerLayoutProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isExist, setIsExist] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsExist(true);
    const { value } = e.target;
    setInputValue(value);
    onInputChange(value);
  }

  function handleClickReset() {
    setInputValue("");
    onInputChange("");
    setIsExist(false);
  }

  return (
    <>
      <InputNameWrapper>
        <TextLabel>{labelText}</TextLabel>
        <EmailCheckButtonWrapper>
          <InputCover $isExist={isExist} $isFocused={isFocused}>
            <InputField
              value={inputValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleInputChange}
              type={type}
              placeholder={placeholder}
              maxLength={6}
            />
            <RemoveInputIcon $isExist={isExist} onClick={handleClickReset} />
          </InputCover>
          <CountdownTimer />
        </EmailCheckButtonWrapper>
      </InputNameWrapper>
    </>
  );
}

// Styled components
const InputNameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3.2rem;
  margin-right: 1.4rem;
`;

const EmailCheckButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputCover = styled.div<{ $isFocused: boolean; $isExist: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.9rem;
  margin-right: 1.5rem;
  border-bottom: 0.1rem solid
    ${({ theme, $isFocused, $isExist }) => ($isFocused || $isExist ? theme.colors.green5 : theme.colors.grey70)};
`;

const InputField = styled.input`
  width: 70%;
  padding: 0;
  height: 2rem;
  ${({ theme }) => theme.fonts.title03}
`;

const RemoveInputIcon = styled(RemoveInputIc)<{ $isExist: boolean }>`
  visibility: ${({ $isExist }) => ($isExist ? "visible" : "hidden")};
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
