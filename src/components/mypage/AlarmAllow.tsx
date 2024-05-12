import { getToken } from "firebase/messaging";
import styled from "styled-components";
import { AlarmDeniedIc, AlarmGrantedIc } from "../../assets";
import { messaging } from "../../core/notification/settingFCM";
import useGetNotificationStatus from "../../hooks/myPage/useGetNotificationStatus";
import useUpdateDeviceToken from "../../hooks/myPage/useUpdateDeviceToken";
import useServiceWorkerRegistration from "../../hooks/useServiceWorkerRegistration";
import { registerServiceWorker } from "../../utils/common/notification";

export default function AlarmAllow() {
  const isRegistered = useServiceWorkerRegistration();
  const allowNotification = useGetNotificationStatus();
  const updateDeviceToken = useUpdateDeviceToken();

  async function handleAlarm() {
    // 1. 서비스 워커 등록 확인
    // 2. 서비스 워커 등록 안되어 있으면 등록 / 등록 되어 있으면 알람 허용 여부 확인
    // 3. 알람 허용 상태 없으면 허용할 건지 묻기 / 허용이면 비허용으로 변경 / 비허용이면 허용으로 변경

    allowNotification ? handleBanNotification() : checkNotificationPermission();
  }

  async function checkNotificationPermission() {
    const permission = Notification.permission;
    if (permission === "granted") {
      handleAllowNotification();
    } else if (permission === "default") {
      const response = await Notification.requestPermission();
      if (response === "granted") {
        handleAllowNotification();
      } else {
        alert("브라우저 알림 권한을 거부했습니다.");
      }
    } else {
      alert("브라우저 알림 권한을 거부했습니다.");
    }
  }

  async function handleAllowNotification() {
    if (isRegistered) {
      registerServiceWorker();
      const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID_KEY });
      updateDeviceToken(token);
    }
  }

  async function handleBanNotification() {
    // if (confirm("정말로 알림을 끄시겠습니까?")) {
    updateDeviceToken(null);
    // }
  }

  return (
    <>
      <TitleWrapper>
        <TitleText>푸시 알림</TitleText>
      </TitleWrapper>
      <ContentWrapper>
        <ContentText>알림 허용</ContentText>
        {allowNotification ? <AlarmGrantedIcon onClick={handleAlarm} /> : <AlarmDeniedIcon onClick={handleAlarm} />}
      </ContentWrapper>
    </>
  );
}

const ContentText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.4rem;
  height: 6rem;
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding-right: 1.4rem;
`;

const TitleWrapper = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  height: 2.6rem;

  background-color: ${({ theme }) => theme.colors.grey20};
`;

const TitleText = styled.h1`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};

  margin-left: 1.4rem;
`;

const AlarmGrantedIcon = styled(AlarmGrantedIc)`
  width: 4rem;
`;

const AlarmDeniedIcon = styled(AlarmDeniedIc)`
  width: 4rem;
`;
