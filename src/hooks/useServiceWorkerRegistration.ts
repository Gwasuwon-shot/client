import { useEffect, useState } from "react";

function useServiceWorkerRegistration() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(function (registrations) {
          if (registrations.length) {
            // console.log("등록된 Service Worker가 있습니다.");
            // registrations.forEach((registration) => {
            //   console.log("Service Worker:", registration);
            // });
            setIsRegistered(true);
          } else {
            // console.log("등록된 Service Worker가 없습니다.");
            setIsRegistered(false);
          }
        })
        .catch(function (error) {
          console.error("Service Worker 등록 상태 확인 중 오류 발생:", error);
          setIsRegistered(false);
        });
    } else {
      console.log("이 브라우저는 Service Worker를 지원하지 않습니다.");
      setIsRegistered(false);
    }
  }, []);

  return isRegistered;
}

export default useServiceWorkerRegistration;
