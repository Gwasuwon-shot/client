import { styled } from "styled-components";
import { TuticeWithTextCommonIc } from "../../assets";
import { TEACHER_FOOTER_CATEGORY } from "../../core/teacherHome/teacherFooter";
import useTeacherFooter from "../../hooks/useTeacherFooter";

export default function Header() {
  const { handleMoveToPage } = useTeacherFooter();

  function handleMoveToHome() {
    handleMoveToPage(TEACHER_FOOTER_CATEGORY.home);
  }

  return (
    <HeaderWrapper>
      <TuticeWithTextCommonIcon onClick={handleMoveToHome} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  width: 100%;
`;

const TuticeWithTextCommonIcon = styled(TuticeWithTextCommonIc)`
  width: 8.9rem;
  height: 3.5rem;
`;
