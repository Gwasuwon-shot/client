import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import AccountManaging from "../components/login/AccountManaging";
import LoginHeader from "../components/login/LoginHeader";
import LoginInput from "../components/login/LoginInput";
import { isGuest } from "../utils/common/isLogined";

export default function Login() {
  if (!isGuest) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Container>
        <LoginHeader />
      </Container>
      <CenterWrapper>
        <LoginInput />
        <AccountManaging />
      </CenterWrapper>
    </>
  );
}

const Container = styled.div`
  margin-left: 1.4rem;
`;

const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
