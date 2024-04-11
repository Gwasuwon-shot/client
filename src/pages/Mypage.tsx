import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userRoleData } from "../atom/loginUser/loginUser";
import { ParentsFooter, TeacherFooter } from "../components/common";
import Header from "../components/mypage/Header";
import AlarmAllow from "../components/mypage/AlarmAllow";
import Terms from "../components/mypage/Terms";
import Feedback from "../components/mypage/Feedback";
import Account from "../components/mypage/Account";

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
