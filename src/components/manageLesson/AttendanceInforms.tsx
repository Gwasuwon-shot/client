import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { isModalOpen } from "../../atom/common/isModalOpen";
import useGetLessonDetail from "../../hooks/useGetLessonDetail";
import useGetLessonSchedule from "../../hooks/useGetLessonSchedule";
import { ScheduleListType } from "../../type/manageLesson/scheduleListType";
import AttendanceCheckModal from "../common/AttendanceCheckModal";
import AttendanceDoubleCheckingModal from "../common/AttendanceDoubleCheckingModal";
import CancelImpossibleModal from "../modal/CanceImpossibleModal";
import AttendanceInform from "./AttendanceInform";

export default function AttendanceInforms() {
  const { manageLessonId } = useParams();
  const [isCheckingModalOpen, setIsCheckingModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useRecoilState(attendanceLesson);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [isCancelImpossibleModalOpen, setIsCancelImpossibleModalOpen] = useState(false);
  const { studentName, subject } = useGetLessonDetail(Number(manageLessonId));
  const { scheduleList } = useGetLessonSchedule(Number(manageLessonId));

  useEffect(() => {
    studentName && subject && setSelectedLesson({ ...selectedLesson, studentName: studentName, subject: subject });
  }, [studentName, subject]);

  function handleCloseCancelImpossibleModal() {
    setIsCancelImpossibleModalOpen(false);
  }

  function checkScheduleListExist() {
    return scheduleList?.length != 0;
  }

  return (
    <>
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
      {isCancelImpossibleModalOpen && (
        <CancelImpossibleModalWrapper>
          <CancelImpossibleModal handleCloseCancelImpossibleModal={handleCloseCancelImpossibleModal} />
        </CancelImpossibleModalWrapper>
      )}

      <GreyBox />
      {checkScheduleListExist() ? (
        <ScheduleWrapper>
          {scheduleList?.map(({ idx, date, status, startTime, endTime }: ScheduleListType, index: number) => (
            <AttendanceInform
              key={idx}
              date={date}
              status={status}
              startTime={startTime}
              endTime={endTime}
              count={Math.abs(index - scheduleList?.length)}
              lessonIdx={idx}
              scheduleIdx={idx}
              setIsCancelImpossibleModalOpen={setIsCancelImpossibleModalOpen}
            />
          ))}
        </ScheduleWrapper>
      ) : (
        <EmptyLesson> 아직 등록된 출결이 없어요</EmptyLesson>
      )}
    </>
  );
}

const GreyBox = styled.div`
  width: 32rem;
  height: 1.1rem;
  margin: 1.5rem 0 2.65rem -1.5rem;

  background-color: ${({ theme }) => theme.colors.grey50};
`;

const ModalWrapper = styled.section`
  position: absolute;

  margin: -37.9rem 0 0 -1.5rem;
`;

const ScheduleWrapper = styled.section`
  overflow: scroll;

  padding-bottom: 7.2rem;
`;

const ModalSection = styled.section<{ $isCheckingModalOpen: boolean }>`
  position: fixed;
  z-index: 3;

  margin: -37.9rem 0 0 -1.5em;
`;

const CancelImpossibleModalWrapper = styled.aside`
  position: fixed;
  z-index: 3;
  margin: -37.9rem 0 0 -1.5rem;
`;

const EmptyLesson = styled.h1`
  color: ${({ theme }) => theme.colors.green5};
  ${({ theme }) => theme.fonts.title02};

  text-align: center;
`;
