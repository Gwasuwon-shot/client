import { styled } from "styled-components";
import { PROGRESS_TREE_IMG_LIST } from "../../core/common/ProgressTree";
import TreeProgress from "../common/TreeProgress";

interface RestOfClassesInfoProps {
  count: number;
  nowCount: number;
  percent: number;
}

export default function RestOfClassesInfo(props: RestOfClassesInfoProps) {
  const { count, nowCount, percent } = props;

  let treeImgSrc = "";

  if (percent < 25) {
    treeImgSrc = PROGRESS_TREE_IMG_LIST[1];
  } else if (percent >= 25 && percent < 50) {
    treeImgSrc = PROGRESS_TREE_IMG_LIST[2];
  } else if (percent >= 50 && percent < 75) {
    treeImgSrc = PROGRESS_TREE_IMG_LIST[3];
  } else if (percent >= 75 && percent < 100) {
    treeImgSrc = PROGRESS_TREE_IMG_LIST[4];
  } else if (percent === 100) {
    treeImgSrc = PROGRESS_TREE_IMG_LIST[5];
  }

  return (
    <RestOfClassesInfoWrapper>
      {count - nowCount > 0 ? (
        <>
          <RestOfClassesTitle>결실을 수확하기까지 </RestOfClassesTitle>
          <RestOfClassesTitle>
            <Count> {count - nowCount}회차&nbsp;</Count> 남았습니다
          </RestOfClassesTitle>
        </>
      ) : (
        <>
          <RestOfClassesTitle>모든 회차가 끝났어요</RestOfClassesTitle>
          <RestOfClassesTitle>
            <Count>결실</Count>을 수확하세요!
          </RestOfClassesTitle>
        </>
      )}

      <ProgressTreeIcon src={treeImgSrc} />

      <ClassStatusInfo>
        {nowCount}회/ 총 {count}회
      </ClassStatusInfo>
      <TreeProgress progress={percent} width={29.2} />
    </RestOfClassesInfoWrapper>
  );
}

const Count = styled.p`
  ${({ theme }) => theme.fonts.title02}
`;

const RestOfClassesInfoWrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
  margin-left: 1.4rem;

  width: 100%;
  position: relative;

  padding-bottom: 1.5rem;
`;

const RestOfClassesTitle = styled.h1`
  display: flex;
  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey900};
`;

const ProgressTreeIcon = styled.img`
  align-self: center;

  width: 12.6rem;
  margin-bottom: 1.5rem;
`;

const ClassStatusInfo = styled.p`
  position: absolute;
  right: 2.8rem;
  bottom: 3.2rem;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey500};
`;
