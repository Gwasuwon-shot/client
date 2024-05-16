import { AppCheckTokenResult } from "firebase/app-check";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { getLessonByTeacher } from "../../api/getLessonByTeacher";
import { patchDeviceToken } from "../../api/myPage/patchDeviceToken";
import { postNotificationRequest } from "../../api/postNotificationRequest";
import { BackButtonSignupIc, BellWelcomeIc } from "../../assets";
import { userRoleData } from "../../atom/loginUser/loginUser";
import { messaging } from "../../core/notification/settingFCM";
import { registerServiceWorker } from "../../utils/common/notification";
import SignupTitleLayout from "../signup/SignupTitleLayout";
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

//알림 활성화뷰
export default function AllowAlert() {
  const userRole = useRecoilValue(userRoleData);
  const navigate = useNavigate();
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });
  const [lessonInfo, setLessonInfo] = useState<lessonListType[]>();

  const MAIN_TEXT = `쉬운 관리를 위해\n알림을 활성화 해보세요 `;
  const SUB_TEXT =
    "푸시알림을 활성화를 통해 출결,\n수업비 관리 도움을 받을 수 있어요";

  async function checkIfLessonExists() {
    const data = await getLessonByTeacher();
    setLessonInfo(data);
  }

  useEffect(() => {
    if (userRole == "선생님") checkIfLessonExists();
  }, []);

  // 알림 허용하기
  async function handleAllowNotification() {
    const permission = await Notification.requestPermission();

    registerServiceWorker();

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });

    setDeviceToken({
      token: token,
    });

    if (userRole == "선생님") {
      lessonInfo && lessonInfo.length ? navigate("/home") : navigate("/tree");
    } else navigate("/home");
  }

  useEffect(() => {
    deviceToken?.token !== "" &&
      deviceToken?.token !== undefined &&
      patchingDeviceToken(deviceToken?.token);
  }, [deviceToken]);

  // 디바이브 토큰 가져오기
  async function getDeviceToken() {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });

    setDeviceToken({
      token: token,
    });
  }

  // 디바이스토큰 업데이트
  const { mutate: patchingDeviceToken } = useMutation(patchDeviceToken, {
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  function handleShowNotification() {
    postNotificationRequest(deviceToken.token);
  }

  function handleMoveToHome() {
    if (userRole == "선생님") {
      lessonInfo && lessonInfo.length ? navigate("/home") : navigate("/tree");
    } else navigate("/home");
  }

  return (
    <>
      {/* <BackButtonSignupIcon onClick={() => setIsWelcome(false)} /> */}
      <Blank />
      <Container>
        <BellWelcomeIcon />
        <SignupTitleLayout>{MAIN_TEXT}</SignupTitleLayout>
        <SubText>{SUB_TEXT}</SubText>
        <ButtonLayout
          onClickButton={handleAllowNotification}
          onClickJump={handleMoveToHome}
          buttonText="할래요!"
          passText="괜찮아요"
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 6rem;
  margin-left: 1.4rem;
`;
const BellWelcomeIcon = styled(BellWelcomeIc)`
  width: 2.9rem;
  height: 3.3rem;
  margin-bottom: 1.5rem;
`;

const SubText = styled.p`
  margin-top: 2.2rem;
  white-space: pre-wrap;

  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body04};
`;

const BackButtonSignupIcon = styled(BackButtonSignupIc)`
  width: 4rem;
  height: 4rem;
  margin-left: -1.4rem;
`;

const Blank = styled.div`
  width: 4rem;
  height: 4rem;
  margin-left: -1.4rem;
`;
