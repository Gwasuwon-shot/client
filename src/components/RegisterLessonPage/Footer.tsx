import { studentNameSelector, subjectNameSelector } from "../../atom/common/datePicker";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BottomButton } from "../common";

export default function Footer() {
  const studentName = useRecoilValue(studentNameSelector);
  const subjectName = useRecoilValue(subjectNameSelector);

  const isNameValid = studentName.length >= 2;
  const isWarning = !isNameValid && studentName.length > 0;
  const isFooterGreen = subjectName !== "" && !isWarning && studentName !== "";
  const navigate = useNavigate();

  function moveToRegularLesson() {
    if (isFooterGreen) {
      navigate("/regular-lesson-cycle");
    }
  }

  return (
    <BottomButton type="button" disabled={!isFooterGreen} isActive={isFooterGreen} onClick={moveToRegularLesson}>
      정기수업 일정 등록하기
    </BottomButton>
  );
}
