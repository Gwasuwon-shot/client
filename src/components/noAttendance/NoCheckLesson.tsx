import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { isModalOpen } from "../../atom/common/isModalOpen";
import useGetMissingAttendanceSchedule from "../../hooks/useGetMissingAttendanceSchedule";
import AttendanceCheckModal from "../common/AttendanceCheckModal";
import AttendanceDoubleCheckingModal from "../common/AttendanceDoubleCheckingModal";
import NoCheckAttendanceContainer from "./NoCheckAttendanceContainer";

interface LessonNScheduleData {
  lessonIdx: number;
  studentName: string;
  count: number;
  scheduleIdx: number;
  subject: string;
}
interface LessonData {
  idx: number;
  studentName: string;
  subject: string;
}
interface ScheduleData {
  idx: number;
  startTime: string;
  endTime: string;
  expectedCount: number;
}

interface MissingAttendanceData {
  date: string;
  dayOfWeek: string;
  missingAttedanceScheduleList: Array<{
    lesson: LessonData;
    schedule: ScheduleData;
  }>;
}

export default function NoCheckLesson() {
  const { missingAttendanceSchedule } = useGetMissingAttendanceSchedule();
  const selectedLesson = useRecoilValue(attendanceLesson);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [isCheckingModalOpen, setIsCheckingModalOpen] = useState<boolean>(false);

  return (
    <>
      <NoAttendanceWrapper>
        {missingAttendanceSchedule &&
          missingAttendanceSchedule?.map(
            ({ date, dayOfWeek, missingAttedanceScheduleList }: MissingAttendanceData, index: number) => {
              return (
                <NoAttendanceContainer key={index}>
                  <NoAttendanceDate>
                    {new Date(date).getMonth() + 1}월 {new Date(date).getDate()}일 ({dayOfWeek})
                  </NoAttendanceDate>
                  {missingAttedanceScheduleList?.map(({ lesson, schedule }) => {
                    return (
                      <NoCheckAttendanceContainer
                        key={lesson.idx}
                        lesson={lesson}
                        schedule={schedule}
                        setOpenModal={setOpenModal}
                      />
                    );
                  })}
                </NoAttendanceContainer>
              );
            },
          )}
        {openModal && selectedLesson && (
          <ModalSection $isCheckingModalOpen={isCheckingModalOpen}>
            <AttendanceCheckModal setIsCheckingModalOpen={setIsCheckingModalOpen} />
          </ModalSection>
        )}

        {openModal && isCheckingModalOpen && (
          <ModalSection $isCheckingModalOpen={isCheckingModalOpen}>
            <AttendanceDoubleCheckingModal setIsCheckingModalOpen={setIsCheckingModalOpen} />
          </ModalSection>
        )}
      </NoAttendanceWrapper>
    </>
  );
}

const NoAttendanceWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin-right: 1.4rem;
  margin-left: 1.4rem;
`;

const NoAttendanceContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const NoAttendanceDate = styled.div`
  display: flex;
  width: 32rem;
  padding: 0.5rem 1.4rem;
  align-items: center;
  gap: 0.8rem;

  color: ${({ theme }) => theme.colors.grey600};
  background-color: ${({ theme }) => theme.colors.grey20};

  ${({ theme }) => theme.fonts.body04};
  margin-left: -1.5rem;
`;

const ModalSection = styled.section<{ $isCheckingModalOpen: boolean }>`
  position: absolute;

  margin: -8.8rem 0 0 -1.5em;
`;
