import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { stepNum } from "../../atom/signup/signup";
import { BUTTON_TEXT, SIGNUP_TITLE } from "../../core/signup/signUpTextLabels";
import { BottomButton } from "../common";
import BackButton from "../common/BackButton";
import ProgressBar from "../common/ProgressBar";
import RoleBlock from "./RoleBlock";
import SignupTitleLayout from "./SignupTitleLayout";

export default function Role() {
  const [isActive, setIsActive] = useState(false);
  const setStep = useSetRecoilState(stepNum);

  function handleDoneClick() {
    setStep(2);
  }

  function handleIsActive() {
    setIsActive(true);
  }

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <ProgressBar progress={0} />
      <Container>
        <SignupTitleLayout>{SIGNUP_TITLE.whichRole}</SignupTitleLayout>
        <RadioWrapper>
          <RoleBlock type="선생님" handleIsActive={handleIsActive} />
          <RoleBlock type="학부모님" handleIsActive={handleIsActive} />
        </RadioWrapper>
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

const RoleRapper = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 3.6rem;
  margin-left: 0.9em;
`;

const RadioButton = styled.input<{
  $RoleNoneCheckSignupIc: string;
  $RoleCheckSignupIc: string;
}>`
  background-image: url(${(props) => props.$RoleNoneCheckSignupIc});
  background-size: cover;

  width: 4rem;
  height: 4rem;
  flex-shrink: 0;

  margin-right: 2rem;

  &:checked {
    background-image: url(${(props) => props.$RoleCheckSignupIc});
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RadioNameWrapper = styled.div`
  display: flex;
  flex-direction: row;

  color: ${({ theme }) => theme.colors.grey900};
`;

const RadioBoldName = styled.label`
  ${({ theme }) => theme.fonts.title02};
`;

const RadioPlainName = styled.label`
  ${({ theme }) => theme.fonts.title03};
`;

const RadioSubName = styled.label`
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body07};
`;

const BackButtonWrapper = styled.div`
  margin-left: 2rem;
`;
