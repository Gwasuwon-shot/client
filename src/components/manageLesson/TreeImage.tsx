import { styled } from "styled-components";
import { LESSON_STATUS_IMAGE } from "../../core/manageLesson/lessonStatusImage";
import useManageLesson from "../../hooks/useManageLesson";
import TreeProgress from "../common/TreeProgress";

export default function TreeImage() {
  const { lesson } = useManageLesson();
  const { count, nowCount, percent } = lesson;

  function checkTreeSrc() {
    switch (true) {
      case percent > 80:
        return LESSON_STATUS_IMAGE.level5;
      case percent > 60:
        return LESSON_STATUS_IMAGE.level4;
      case percent > 40:
        return LESSON_STATUS_IMAGE.level3;
      case percent > 20:
        return LESSON_STATUS_IMAGE.level2;
      case percent > 0:
        return LESSON_STATUS_IMAGE.level1;
      default:
        return;
    }
  }

  return (
    <>
      <img src={checkTreeSrc()} alt="열매 이미지" />
      <CountBox>
        {count - nowCount}회/ 총 {count}회
      </CountBox>
      <TreeProgress progress={percent} width={29.2} />
    </>
  );
}

const CountBox = styled.p`
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body02};
`;
