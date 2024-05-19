import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { LESSON_STATUS_IMAGE } from "../../core/manageLesson/lessonStatusImage";
import useGetLessonProgress from "../../hooks/useGetLessonProgress";
import TreeProgress from "../common/TreeProgress";

export default function TreeImage() {
  const { manageLessonId } = useParams();
  const { count, nowCount, percent } = useGetLessonProgress(Number(manageLessonId));

  function checkTreeSrc() {
    switch (true) {
      case percent === 100:
        return LESSON_STATUS_IMAGE.level5;
      case percent >= 75:
        return LESSON_STATUS_IMAGE.level4;
      case percent >= 50:
        return LESSON_STATUS_IMAGE.level3;
      case percent >= 25:
        return LESSON_STATUS_IMAGE.level2;
      case percent >= 0:
        return LESSON_STATUS_IMAGE.level1;
      default:
        return;
    }
  }

  return (
    <>
      <ImgWrapper>
        <img src={checkTreeSrc()} alt="결실 이미지" />
      </ImgWrapper>
      <CountBox>
        {nowCount}회/ 총 {count}회
      </CountBox>
      <TreeProgress progress={percent} width={29.2} />
    </>
  );
}

const CountBox = styled.p`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 1.5rem;

  color: ${({ theme }) => theme.colors.grey500};

  ${({ theme }) => theme.fonts.body02};
`;

const ImgWrapper = styled.section`
  display: flex;
  justify-content: center;

  margin-bottom: -1.5rem;
`;
