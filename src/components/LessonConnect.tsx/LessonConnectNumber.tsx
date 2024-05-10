import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { parentsPhoneState } from "../../atom/registerLesson/registerLesson";
import { BUTTON_TEXT } from "../../core/signup/signUpTextLabels";
import useFormattedPhoneNumber from "../../hooks/signupLogin/usePhoneNumberFormat";
import { BackButton, BottomButton, ProgressBar } from "../common";
import InputLayout from "../signup/InputLayout";
import SignupTitleLayout from "../signup/SignupTitleLayout";
import REACTGA from "react-ga4";

interface LessonConnectNumberProps {
  handlePassStep: () => void;
}

export default function LessonConnectNumber({ handlePassStep }: LessonConnectNumberProps) {
  const [isActive, setIsActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useFormattedPhoneNumber();
  const setParentPhone = useSetRecoilState(parentsPhoneState);

  function handleDoneClick() {
    handlePassStep();
    REACTGA.event({
      category: "Users",
      action: "Click",
    });
    // alert("준비 중인 기능입니다.");
  }

  function handleChangeNumber(value: string) {
    setPhoneNumber(value);
    setIsActive(true);
    setParentPhone(phoneNumber.replace(/\D+/g, ""));
  }

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <ProgressBar progress={50} />
      <Container>
        <SignupTitleLayout>
          과외 수업 관리를 위해 <br />
          연동할 휴대폰 번호를 입력해주세요
        </SignupTitleLayout>
        <InputNotice>
          앱 PUSH 알림을 받으실 <br /> 학부모님의 전화번호를 입력해주세요
        </InputNotice>
        <InputLayout
          type="tel"
          labelText="휴대폰 번호"
          placeholder="번호 ‘-’ 제외하고 입력"
          onInputChange={handleChangeNumber}
        />
      </Container>
      <BottomButton
        type="button"
        disabled={!isActive}
        isActive={isActive}
        children={BUTTON_TEXT.next}
        onClick={handleDoneClick}
      />
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;

  padding-left: 1.6rem;
  margin-top: 2.8rem;
`;

const RadioWrapper = styled.div`
  margin-top: 5.08rem;
`;

const BackButtonWrapper = styled.div`
  margin-left: 2rem;
`;

const InputNotice = styled.h2`
  display: flex;

  margin-top: 0.8rem;

  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;
