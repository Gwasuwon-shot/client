import React from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import { scheduleType } from "../../type/common/scheduleType";
import NoCheckPageAttendanceButton from "../common/NoCheckPageAttendanceButton";
import StudentColorBox from "../common/StudentColorBox";
import SubjectLabel from "../common/SubjectLabel";

interface LessonData {
  idx: number;
  studentName: string;
  subject: string;
}

interface LessonNScheduleData {
  lessonIdx: number;
  studentName: string;
  count: number;
  scheduleIdx: number;
  subject: string;
}

interface ScheduleData {
  idx: number;
  startTime: string;
  endTime: string;
  expectedCount: number;
}

interface NoCheckAttendanceContanierProps {
  lesson: LessonData;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  schedule: scheduleType;
}

export default function NoCheckAttendanceContanier(props: NoCheckAttendanceContanierProps) {
  const { setOpenModal, lesson, schedule } = props;
  const { idx, studentName, subject } = lesson;
  const { startTime, endTime, expectedCount } = schedule;
  const setSelectedLesson = useSetRecoilState(attendanceLesson);
  const setAttendanceData = useSetRecoilState(attendanceStatus);

  function handleAttendanceCheck(): void {
    setSelectedLesson({
      lessonIdx: idx,
      studentName: studentName,
      count: expectedCount,
      scheduleIdx: schedule?.idx,
      subject: subject,
    });
    setAttendanceData({ idx: schedule?.idx, status: "" });
    setOpenModal(true);
  }

  return (
    <>
      <ContentContainer>
        <StudentColorBox lessonIdx={idx} />
        <InformContainer>
          <TimeWrapper>
            <Time>
              {startTime} ~ {endTime}
            </Time>
            <Bar> | </Bar>
            <Time>{expectedCount}회차</Time>
          </TimeWrapper>
          <NameSubjectWrapper>
            <Name> {studentName}</Name>
            <Subject>
              <SubjectLabel subject={subject} color="#757A80" backgroundColor={STUDENT_COLOR[idx % 10]}></SubjectLabel>
            </Subject>
          </NameSubjectWrapper>
        </InformContainer>
        <ButtonWrapper onClick={() => handleAttendanceCheck()}>
          <NoCheckPageAttendanceButton />
        </ButtonWrapper>
      </ContentContainer>
    </>
  );
}

const ContentContainer = styled.div`
  display: flex;
  gap: 1.4rem;
  margin: 1rem 0;
`;

const InformContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 19rem;
`;

const Bar = styled.p`
  color: ${({ theme }) => theme.colors.grey100};
`;

const Time = styled.h2`
  ${({ theme }) => theme.fonts.body06};
  color: ${({ theme }) => theme.colors.grey500};
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 1.3rem;

  gap: 0.5rem;
`;

const Name = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const Subject = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.caption01};
  color: ${({ theme }) => theme.colors.grey500};
`;

const NameSubjectWrapper = styled.div`
  display: flex;

  height: 1.6rem;
  gap: 0.4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
