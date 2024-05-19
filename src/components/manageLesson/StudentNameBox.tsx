import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { LessonInfoLessonRecordIc } from "../../assets";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useGetLessonDetail from "../../hooks/useGetLessonDetail";
import { CommonBackButton } from "../common";

import StudentNameLabel from "../common/StudentNameLabel";

export default function StudentNameBox() {
  const { manageLessonId } = useParams();
  const { idx, studentName, subject, lessonCode } = useGetLessonDetail(Number(manageLessonId));
  const navigate = useNavigate();
  const [pageY, setPageY] = useState<number>(0);
  const [isHighest, setIsHighest] = useState(true);
  const documentRef = useRef(document);

  useEffect(() => {
    const handleScroll = () => {
      setPageY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkFlexDirection = () => {
      if (pageY < 35 && isHighest !== true) {
        setIsHighest(true);
      } else if (pageY >= 30 && isHighest !== false) {
        setIsHighest(false);
      }
    };

    checkFlexDirection();
  }, [pageY]);

  function handleGotoLessonInfoList() {
    navigate(`/lesson-info/${manageLessonId}`, { state: true });
  }

  return (
    <StudentNameWrapper $isHighest={isHighest} color={STUDENT_COLOR[idx % 10]}>
      <CommonBackButton />

      <StudentNameBoxWrapper $isHighest={isHighest}>
        <LabelWrapper>
          <StudentNameLabel
            studentName={studentName}
            subject={subject}
            backgroundColor="#F1F3F5"
            color="#5B6166"
            isBig={true}
          />
        </LabelWrapper>

        <LessonManageIcon onClick={() => handleGotoLessonInfoList()} />
      </StudentNameBoxWrapper>
    </StudentNameWrapper>
  );
}

const LessonManageIcon = styled(LessonInfoLessonRecordIc)`
  width: 2rem;
  height: 2rem;
`;

const StudentNameWrapper = styled.div<{ $isHighest: boolean; color: string }>`
  display: flex;
  flex-direction: ${({ $isHighest }) => ($isHighest ? "column" : "row")};
  background-color: ${({ color }) => color};

  width: 100%;

  position: sticky;
  top: 0;
`;

const StudentNameBoxWrapper = styled.header<{ $isHighest: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isHighest }) => $isHighest && "0 1.4rem 1.4rem"};

  margin-left: ${({ $isHighest }) => $isHighest && -1}rem;
  width: ${({ $isHighest }) => (!$isHighest ? 87 : 100)};
`;

const LabelWrapper = styled.header`
  margin-left: 0.4rem;
`;
