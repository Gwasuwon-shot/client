import React from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { NextMonthArrowButton } from "../../assets";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import { LessonType } from "../../type/teacherHome/previewBannerScheduleType";
import StudentColorBox from "../common/StudentColorBox";
import SubjectLabel from "../common/SubjectLabel";

interface ExtensionLessonContainerProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  endScheduleDate: string;
  lesson: LessonType;
}

export default function ExtensionLessonContainer(props: ExtensionLessonContainerProps) {
  const [selectedLesson, setSelectedLesson] = useRecoilState(attendanceLesson);
  const { endScheduleDate, setOpenModal, lesson } = props;
  const { idx, studentName, subject, count } = lesson;

  function handleClickExtension() {
    setSelectedLesson({ ...selectedLesson, lessonIdx: idx, studentName: studentName, subject: subject, count: count });
    setOpenModal(true);
  }

  return (
    <>
      <ContentWrapper key={idx}>
        <StudentColorBox backgroundColor={STUDENT_COLOR[idx % 11]} />
        <DateandCount>
          {new Date(endScheduleDate).getMonth() + 1}.{new Date(endScheduleDate).getDate()}
          <p>{count}회차 종료 </p>
        </DateandCount>
        <NameandSubject>
          <Name>{studentName}</Name>
          <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[idx % 11]} color="#5B6166" />
        </NameandSubject>
        <SlideButton onClick={handleClickExtension} />
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  gap: 1.8rem;
  flex: 0 0 auto;

  align-items: center;

  width: 29rem;
`;

const DateandCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1.8rem;

  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;

const Name = styled.h3`
  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const NameandSubject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const SlideButton = styled(NextMonthArrowButton)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
