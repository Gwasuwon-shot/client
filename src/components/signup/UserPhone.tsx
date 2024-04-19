import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { newSocialUser } from "../../atom/signup/signup";
import { AUTH_CODE_PATTERN } from "../../core/signup/regex";
import useReverseRole from "../../hooks/signupLogin/useReverseRole";
import useSendValidNumber from "../../hooks/signupLogin/useSendValidNumber";
import useValidatePhone from "../../hooks/signupLogin/useValidatePhone";
import BackButton from "../common/BackButton";
import ProgressBar from "../common/ProgressBar";
import InputHint from "./InputHint";
import { InputBtnLayout, InputTimerLayout } from "./InputLayout";
import SignupTitleLayout from "./SignupTitleLayout";

export default function UserPhone() {
  const [newUser, setNewUser] = useRecoilState(newSocialUser);
  const [number, setNumber] = useState("");
  const [validCode, setValidCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isWrong, setIsWrong] = useState(false);

  const { reverseRole } = useReverseRole();

  const digitNumber = number.replace(/\D+/g, "");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleChangePhoneNum = (value: string) => setNumber(value);

  const handleChangeValidNum = (value: string) => {
    setValidCode(value);
    setIsDone(AUTH_CODE_PATTERN.test(value));
  };

  const successToSendCode = () => {
    setIsCodeSent(true);
    setIsVisible(true);
  };

  const WrongCode = () => {
    setIsWrong(true);
  };

  const successToConfirmCode = () => {
    setNewUser((prev) => ({ ...prev, phone: digitNumber }));
    console.log();
  };

  const sendValidNumber = useSendValidNumber(successToSendCode);
  const validatePhone = useValidatePhone({
    successToConfirmCode,
    WrongCode,
    newUser,
  });

  const handleClickSend = () => {
    sendValidNumber.mutate(digitNumber);
  };

  const handleClickConfirm = () => {
    validatePhone.mutate({ number: digitNumber, validCode: validCode });
  };

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <ProgressBar progress={isDone ? 75 : 50} />
      <Container>
        <SignupTitleLayout>
          마지막으로 <br />
          휴대폰 번호 인증을 해주세요.
        </SignupTitleLayout>
        <PlainText>
          인증을 통해 {reverseRole}과 연동하여 <br />
          수업 진행도를 공유할 수 있어요
        </PlainText>
        <InputWrapper>
          {isCodeSent && (
            <>
              <InputTimerLayout
                labelText="인증번호"
                placeholder="숫자 8자리 입력"
                type="tel"
                onInputChange={handleChangeValidNum}
              />
              <InputHint
                text="인증번호를 정확히 입력해 주세요"
                color="red"
                isVisible={isWrong}
              />
            </>
          )}
        </InputWrapper>
        {isCodeSent && isVisible && (
          <InputHint text="문자로 인증문자를 전송했어요" color="green" />
        )}
        <InputBtnLayout
          labelText="휴대폰 번호"
          placeholder="번호 ‘-’ 제외하고 입력"
          buttonText={isCodeSent ? "재전송" : "인증번호"}
          type="tel"
          onInputChange={handleChangePhoneNum}
          onClickButton={handleClickSend}
        />
        <SubmitButton
          disabled={!isDone}
          $isActive={isDone}
          onClick={handleClickConfirm}
        >
          인증번호 확인
        </SubmitButton>
      </Container>
    </>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 1.6rem;
  margin-top: 1.8rem;
`;

const BackButtonWrapper = styled.div`
  margin-left: 2rem;
`;

const PlainText = styled.label`
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body04};
  white-space: pre-wrap;
`;

const SubmitButton = styled.button<{ $isActive: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6.3rem;
  margin-left: -1.6rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.green5 : theme.colors.grey50};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.grey0 : theme.colors.grey200};
  ${({ theme }) => theme.fonts.body01};
`;
