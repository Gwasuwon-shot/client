import styled from "styled-components";
// import AgreeChecking from "./AgreeChecking";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newSocialUser, stepNum } from "../../atom/signup/signup";
import { BUTTON_TEXT } from "../../core/signup/signUpTextLabels";
import useReverseRole from "../../hooks/signupLogin/useReverseRole";
import BackButton from "../common/BackButton";
import ProgressBar from "../common/ProgressBar";
import InputLayout from "./InputLayout";
import SignupTitleLayout from "./SignupTitleLayout";

export default function UserName() {
  const [newUser, setNewUser] = useRecoilState(newSocialUser);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { reverseRole } = useReverseRole();
  const setStep = useSetRecoilState(stepNum);
  const role = newUser.role;

  function handleMoveToPhone() {
    setNewUser((prev) => ({ ...prev, name: name }));
    setStep(3);
  }

  const handleInputChange = (value: string) => {
    setName(value);
    setIsActive(value.trim() !== "");
  };

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <ProgressBar progress={25} />
      <Container>
        <SignupTitleLayout>
          {role}의 <br />
          이름을 알려주세요.
        </SignupTitleLayout>
        <PlainText>
          {reverseRole}과의 연결을 위해 실명으로 입력해주세요
        </PlainText>

        <InputLayout
          type="text"
          labelText="이름"
          placeholder="실명 입력"
          onInputChange={handleInputChange}
        />

        <SubmitButton
          type="button"
          disabled={!isActive}
          $isActive={isActive}
          onClick={handleMoveToPhone}
        >
          <ButtonText>{BUTTON_TEXT.next}</ButtonText>
        </SubmitButton>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 1.8rem;
  margin-left: 1.4rem;
`;

const PlainText = styled.label`
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body04};

  white-space: pre-wrap;
`;

const BackButtonWrapper = styled.div`
  margin-left: 2rem;
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

const ButtonText = styled.p`
  position: relative;

  top: -1rem;
  ${({ theme }) => theme.fonts.body01};
`;

const InputNameWrapper = styled.div<{ $nameFocus: boolean; $isName: boolean }>`
  display: flex;
  flex-direction: column;

  width: 28rem;

  margin-top: 3.2rem;

  border-bottom: 0.1rem solid
    ${({ theme, $nameFocus, $isName }) =>
      $nameFocus || $isName ? theme.colors.green5 : theme.colors.grey70};
`;

const InputField = styled.input`
  padding: 0;
  height: 2rem;
  margin-top: 1em;
  margin-bottom: 1.1rem;
  margin-left: 0.2rem;
  ${({ theme }) => theme.fonts.title03};

  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
    ${({ theme }) => theme.fonts.title03};
  }
`;
