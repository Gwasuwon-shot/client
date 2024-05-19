import { useState } from "react";
import { css, styled } from "styled-components";
import { LessonInfoLessonRecordIc } from "../../assets";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import SubjectLabel from "../common/SubjectLabel";
import PastLessonRecordList from "./PastLessonRecordList";
import RestOfClassesInfo from "./RestOfClassesInfo";

import { useNavigate, useParams } from "react-router-dom";
import useGetLessonDetail from "../../hooks/useGetLessonDetail";
import useGetLessonProgress from "../../hooks/useGetLessonProgress";
import CommonBackButton from "../common/CommonBackButton";
import DepositRecordList from "./DepositRecord";

export default function LessonRecordDetail() {
  const { lessonId } = useParams();
  const [isClassRecord, setIsClassRecord] = useState<boolean>(true);
  const { count, nowCount, percent } = useGetLessonProgress(Number(lessonId));
  const { idx, teacherName, studentName, subject } = useGetLessonDetail(Number(lessonId));

  const navigate = useNavigate();

  function handleGotoLessonInfoList() {
    navigate(`/lesson-info/${lessonId}`, { state: false });
  }

  return (
    <>
      <CommonBackButton />
      <LessonManageIcon onClick={() => handleGotoLessonInfoList()} />
      <LessonRecordHeader>
        <StudentName>{studentName}</StudentName>
        <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[idx % 10]} color={"#5B6166"} />
        <TeacherName>{teacherName} 선생님</TeacherName>
      </LessonRecordHeader>

      <SelectMenuWrapper>
        <SelectMenuButton $isClassRecord={isClassRecord} onClick={() => setIsClassRecord(true)}>
          수업내역
        </SelectMenuButton>
        <SelectMenuButton $isClassRecord={!isClassRecord} onClick={() => setIsClassRecord(false)}>
          입금내역
        </SelectMenuButton>
      </SelectMenuWrapper>

      {isClassRecord ? (
        <MainContentWrapper>
          <RestOfClassesInfo count={count} nowCount={nowCount} percent={percent} />
          <DivisionLine />
          <PastLessonRecordList />
        </MainContentWrapper>
      ) : (
        <DepositRecordList />
      )}
    </>
  );
}

const LessonRecordHeader = styled.header`
  display: flex;
  align-items: center;

  margin-top: 1rem;
  margin-left: 2.1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey900};
`;

const StudentName = styled.h1`
  margin-left: 0.2rem;
  margin-right: 0.6rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const TeacherName = styled.p`
  margin-left: 0.6rem;

  ${({ theme }) => theme.fonts.body06};
  color: ${({ theme }) => theme.colors.grey600};
`;

const LessonManageIcon = styled(LessonInfoLessonRecordIc)`
  width: 2rem;
  height: 2rem;

  position: absolute;
  top: 5.3rem;
  right: 1.493rem;
`;

const SelectMenuWrapper = styled.aside`
  display: flex;
  align-items: center;
  gap: 1.39rem;

  width: 29.2rem;
  height: 4rem;
  margin: 1.8rem auto 0 auto;
  padding: 0 0.397rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.grey50};
`;

const SelectMenuButton = styled.button<{ $isClassRecord: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13.5075rem;
  height: 3.2rem;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme, $isClassRecord }) => ($isClassRecord ? theme.colors.grey900 : theme.colors.grey400)};

  ${({ $isClassRecord }) =>
    $isClassRecord
      ? css`
          background-color: #ffffff;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.grey50};
        `};
`;

const DivisionLine = styled.div`
  width: 100%;
  height: 1.1rem;

  background-color: ${({ theme }) => theme.colors.grey50};
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
