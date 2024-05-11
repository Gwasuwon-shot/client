import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { getLessonByTeacher } from "../../api/getLessonByTeacher";
import { WelcomeBgImg } from "../../assets";
import { userRoleData } from "../../atom/loginUser/loginUser";
import { newUserData } from "../../atom/signup/signup";
import ButtonLayout from "./ButtonLayout";

interface lessonListType {
  idx: number;
  teacherName: string;
  studentName: string;
  subject: string;
  count: number;
  nowCount: number;
  percent: number;
}

const WELCOME_TEXT = {
  선생님: {
    WELCOME: "선생님 환영해요!",
    INTRO: "수업을 등록하고\n쉬운 과외 관리를 시작하세요",
  },
  부모님: {
    WELCOME: "학부모님 환영해요!",
    INTRO: "튜티스를 통해 선생님과\n쉬운 과외 관리를 시작하세요.",
  },
};

export default function WelcomeLayout() {
  const navigate = useNavigate();
  const userRole = useRecoilValue(userRoleData);
  const userData = useRecoilValue(newUserData);
  const [lessonInfo, setLessonInfo] = useState<lessonListType[]>();

  const userName = userData?.name;

  async function checkIfLessonExists() {
    const data = await getLessonByTeacher();
  }

  useEffect(() => {
    if (userRole) checkIfLessonExists();
    else checkAlarmAlert();
  }, []);

  useEffect(() => {
    if (lessonInfo) checkAlarmAlert();
  }, [lessonInfo]);

  async function checkAlarmAlert() {
    const permission = Notification.permission;

    //   if (permission == "granted" || permission == "denied") {
    //     if (userRole == "선생님") {
    //       lessonInfo && lessonInfo.length > 0 ? navigate("/home") : navigate("/tree");
    //     } else navigate("/home");
    //   } else {
    //     navigate("/alert");
    //   }
  }

  return (
    <>
      <WelcomeImage />
      <Container>
        <SubText>
          {userName} {WELCOME_TEXT[userRole as keyof typeof WELCOME_TEXT].WELCOME}
        </SubText>
        <MainText>{WELCOME_TEXT[userRole as keyof typeof WELCOME_TEXT].INTRO}</MainText>
      </Container>
      <ButtonWrapper>
        <ButtonLayout
          onClickButton={() => navigate("/register-lesson")}
          onClickJump={() => navigate("/home")}
          buttonText="시작하기"
          passText="나중에 등록하기"
        />
      </ButtonWrapper>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.4rem;
`;

const SubText = styled.p`
  margin-top: 3.4rem;
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body04};
`;

const MainText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title01};

  white-space: break-spaces;
`;

const WelcomeImage = styled(WelcomeBgImg)`
  display: flex;

  position: absolute;
  width: 100vw;
  height: 100%;
  /* height: 57rem; */
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
