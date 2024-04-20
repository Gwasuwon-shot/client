import { useRecoilState, useRecoilValue } from "recoil";
import { userRoleData } from "../atom/loginUser/loginUser";
import ParentsHome from "../components/parentsHome/ParentsHome";
import TeacherHome from "../components/teacherHome/TeacherHome";

export default function Home() {
  const [userRole] = useRecoilValue(userRoleData);

  function checkIsTeacher() {
    return userRole === "선생님";
  }

  return <>{checkIsTeacher() ? <TeacherHome /> : <ParentsHome />}</>;
}
