import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { parentsFooterCategory } from "../../atom/common/parentsFooterCategory";
import useParentsFooter from "../../hooks/useParentsFooter";
import { ParentsFooterType } from "../../type/parentsHome/ParentsFooterType";
import ParentsFooterIcons from "./ParentsFooterIcons";

export default function ParentsFooter() {
  const [parentsFooterList, setParentsFooterList] = useRecoilState<ParentsFooterType[]>(parentsFooterCategory);
  const { handleMoveToPage } = useParentsFooter();

  return (
    <ParentsFooterWrapper>
      {parentsFooterList.map(({ id, category, isMoved }) => (
        <Icon key={id} onClick={() => handleMoveToPage(category)}>
          <ParentsFooterIcons category={category} isMoved={isMoved} />
        </Icon>
      ))}
    </ParentsFooterWrapper>
  );
}

const ParentsFooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;

  width: 32rem;
  height: 7.2rem;
  padding: 0.3rem 1.5rem 1.9rem;

  background: ${({ theme }) => theme.colors.grey0};

  flex-shrink: 0;

  border-radius: 1.8rem 1.8rem 0 0;

  border-top: 1px solid ${({ theme }) => theme.colors.grey50};

  box-shadow: 0 0 0.5rem 0 rgb(56 62 68 / 8%);
`;

const Icon = styled.i`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  cursor: pointer;
`;

const MenuName = styled.p<{ $isMoved: boolean }>`
  ${({ theme }) => theme.fonts.caption01};

  color: ${({ theme, $isMoved }) => ($isMoved ? theme.colors.green9 : theme.colors.grey150)};
`;
