import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { ShareViaKakao } from "../../assets";
import { studentNameState } from "../../atom/common/datePicker";
import useGetLessonByUser from "../../hooks/useGetLessonByUser";

interface KakaoShareProp {
  url: string;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export function KakaoShare(props: KakaoShareProp) {
  const { url } = props;
  const { userName } = useGetLessonByUser();
  const [studentName, setStudentName] = useRecoilState<string>(studentNameState);

  useEffect(() => {
    handleClickKakao();
  }, []);

  function handleClickKakao() {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_APP_KAKAO_APP_KEY);
      }

      kakao.Share.createDefaultButton({
        container: "#kakao-link-btn",

        objectType: "feed",

        content: {
          title: "수업링크 코드 공유",
          description: `[${userName}]선생님이 [${studentName}]학생의\nTutice 초대장을 보냈습니다.\n\nTutice 링크 \n ${url}`,
          imageUrl: `https://tutice.s3.ap-northeast-2.amazonaws.com/board/image/Thumbnail.png`,
          imageWidth: 800,
          imageHeight: 432,
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },

        buttons: [
          {
            title: "수업링크 바로가기",
            link: {
              webUrl: url,
              mobileWebUrl: url,
            },
          },
        ],
      });
    }
  }

  return (
    <button id="kakao-link-btn" onClick={handleClickKakao}>
      <KakaoLessonShareIcon />
    </button>
  );
}

const KakaoLessonShareIcon = styled(ShareViaKakao)`
  width: 9.2rem;
  height: 6.4rem;
`;
