import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { studentNameState } from "../atom/common/datePicker";
import { lessonCodeAndPaymentId } from "../atom/tuitionPayment/tuitionPayment";
import CommonBackButton from "../components/common/CommonBackButton";
import LessonInfoList from "../components/lessonRecord/LessonInfoList";
import useGetLessonDetail from "../hooks/useGetLessonDetail";

export default function LessonInfo() {
  const [studentNameForLinkShare, setStudentNameForLinkShare] = useRecoilState<string>(studentNameState);
  const [codeAndId, setCodeAndId] = useRecoilState(lessonCodeAndPaymentId);
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { state } = useLocation();
  const { idx, studentName, subject, lessonCode } = useGetLessonDetail(Number(lessonId));

  function moveToLinkShare() {
    setCodeAndId({
      ...codeAndId,
      lessonCode,
      lessonidx: idx,
    });
    setStudentNameForLinkShare(studentName);
    navigate("/lesson-share", { state: false });
  }

  return (
    <>
      <CommonBackButton />
      <Header>
        <LessonInfoHeader>수업 정보</LessonInfoHeader>
        {state && <LinkShareTag onClick={moveToLinkShare}>수업링크 공유</LinkShareTag>}
      </Header>
      <LessonInfoList state={state} />
    </>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.4rem;
`;

const LinkShareTag = styled.p`
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body04};
  text-decoration-line: underline;
`;

const LessonInfoHeader = styled.header`
  margin: 1.4rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;
