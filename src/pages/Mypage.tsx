import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userRoleData } from "../atom/loginUser/loginUser";
import { ParentsFooter, TeacherFooter } from "../components/common";
import Header from "../components/myPage/Header";
import AlarmAllow from "../components/myPage/AlarmAllow";
import Terms from "../components/myPage/Terms";
import Feedback from "../components/myPage/Feedback";
import Account from "../components/myPage/Account";

export default function MyPage() {
  const userRole = useRecoilValue(userRoleData);

  function checkIsTeacher() {
    return userRole === "선생님";
  }

  return (
    <>
      <MyPageWrapper>
        <Header />
        <AlarmAllow />
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
