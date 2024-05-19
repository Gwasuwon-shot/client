import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { TuticeWithTextCommonIc } from "../../assets";
import SignupTitleLayout from "../signup/SignupTitleLayout";
import ButtonLayout from "./ButtonLayout";

export default function AfterSignup() {
  const navigate = useNavigate();
  const MAIN_TEXT = `환영해요!`;
  const SUB_TEXT = `관리할 수업을 추가해보세요!`;

  function handleToNextStep() {
    navigate("/register-lesson");
  }

  function handleToHome() {
    navigate("/home");
  }

  return (
    <>
      <Container>
        <TuticeWithTextCommonIcon />
        <SignupTitleLayout>{MAIN_TEXT}</SignupTitleLayout>
        <SubText>{SUB_TEXT}</SubText>
        <ButtonLayout
          onClickButton={handleToNextStep}
          onClickJump={handleToHome}
          buttonText="수업 추가"
          passText="건너뛰기"
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 11.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TuticeWithTextCommonIcon = styled(TuticeWithTextCommonIc)`
  width: 16.8rem;
  height: 5.6rem;

  margin-bottom: 6.1rem;
`;

const SubText = styled.p`
  margin-top: 1.2rem;
  white-space: pre-wrap;

  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body02};
`;
