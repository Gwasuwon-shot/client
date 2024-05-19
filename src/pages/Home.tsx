import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { removeCookie } from "../api/cookie";
import { userRoleData } from "../atom/loginUser/loginUser";
import ParentsHome from "../components/parentsHome/ParentsHome";
import TeacherHome from "../components/teacherHome/TeacherHome";

export default function Home() {
  const navigate = useNavigate();
  const userRole = useRecoilValue(userRoleData);

  useEffect(() => {
    if (userRole === "") {
      removeCookie("accessToken");
      removeCookie("refreshToken");

      navigate("/home");
    }
  }, []);

  function checkIsTeacher() {
    return userRole === "선생님";
  }

  return <>{checkIsTeacher() ? <TeacherHome /> : <ParentsHome />}</>;
}
