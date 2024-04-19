import { styled } from "styled-components";
import WelcomeLayout from "../components/welcomeSignup/WelcomeLayout";

export default function WelcomeSignup() {
  return (
    <Container>
      <WelcomeLayout />
    </Container>
  );
}

const Container = styled.div`
  margin-left: 1.4rem;
`;
