import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import useGetLessonProgress from "../../hooks/useGetLessonProgress";

export default function WelcomeTreeLevel() {
  const { manageLessonId } = useParams();
  const { count, nowCount } = useGetLessonProgress(Number(manageLessonId));

  function checkIsLastLesson() {
    return count === nowCount;
  }

  return (
    <WelcomeTitle>
      {checkIsLastLesson() ? (
        <>
          <TitleWrapper>모든 회차가 끝났어요 </TitleWrapper>
          <TitleWrapper>
            <StrongText>결실</StrongText>을 수확하세요!
          </TitleWrapper>
        </>
      ) : (
        <>
          <TitleWrapper>결실을 수확하기까지 </TitleWrapper>
          <TitleWrapper>
            <StrongText>{count - nowCount}회차&nbsp;</StrongText> 남았습니다
          </TitleWrapper>
        </>
      )}
    </WelcomeTitle>
  );
}

const TitleWrapper = styled.div`
  display: flex;
`;

const StrongText = styled.p`
  ${({ theme }) => theme.fonts.title02}
`;

const WelcomeTitle = styled.div`
  margin-top: 1.6rem;
  ${({ theme }) => theme.fonts.title03}
`;
