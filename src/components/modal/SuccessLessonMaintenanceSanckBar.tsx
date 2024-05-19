import styled from "styled-components";
import SnackBarPopup from "../common/SnackBarPopup";

export default function SuccessLessonMaintenanceSnackBar() {
  return (
    <SnackBarPopup isCheck={false}>
      <Contents>수업을 연장했어요!</Contents>
    </SnackBarPopup>
  );
}

const Contents = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body05};
`;
