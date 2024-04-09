import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userRoleData } from "../atom/loginUser/loginUser";
import { ParentsFooter } from "../components/common";
import TeacherFooter from "../components/common/TeacherFooter";
import Account from "../components/myPage/Account";
import Alarm from "../components/myPage/Alarm";
import Feedback from "../components/myPage/Feedback";
import Header from "../components/myPage/Header";
import Terms from "../components/myPage/Terms";

export default function Mypage() {
  const userRole = useRecoilValue(userRoleData);

  function checkIsTeacher() {
    return userRole === "선생님";
  }

  return (
    <>
      <MyPageWrapper>
        <Header />
        <Alarm />
        <Terms />
        <Feedback />
        <Account />
      </MyPageWrapper>
      {checkIsTeacher() ? <TeacherFooter /> : <ParentsFooter />}
    </>
  );
}

const MyPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
`;
