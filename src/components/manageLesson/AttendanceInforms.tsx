import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { isModalOpen } from "../../atom/common/isModalOpen";
import useGetCanceledScheduleByLesson from "../../hooks/manageLessons/useGetCanceledScheduleByLesson";
import useGetLessonDetail from "../../hooks/useGetLessonDetail";
import useGetLessonSchedule from "../../hooks/useGetLessonSchedule";
import { ScheduleListType } from "../../type/manageLesson/scheduleListType";
import AttendanceCheckModal from "../common/AttendanceCheckModal";
import AttendanceDoubleCheckingModal from "../common/AttendanceDoubleCheckingModal";
import CancelImpossibleModal from "../modal/CanceImpossibleModal";
import AttendanceInform from "./AttendanceInform";

interface scheduleListType {
  idx: number;
  date: string;
  status: string;
  startTime: string;
  endTime: string;
}

export default function AttendanceInforms() {
  const { manageLessonId } = useParams();

  const [isCheckingModalOpen, setIsCheckingModalOpen] = useState(false);
  const [isCancelImpossibleModalOpen, setIsCancelImpossibleModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [selectedLesson, setSelectedLesson] = useRecoilState(attendanceLesson);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const { studentName, subject } = useGetLessonDetail(Number(manageLessonId));

  const { scheduleList } = useGetLessonSchedule(Number(manageLessonId));
  const { cancelScheduleList } = useGetCanceledScheduleByLesson(Number(manageLessonId));

  const combinedClasses = cancelScheduleList
    .concat(scheduleList)
    .sort((a: scheduleListType, b: scheduleListType) => b.idx - a.idx);

  useEffect(() => {
    studentName && subject && setSelectedLesson({ ...selectedLesson, studentName: studentName, subject: subject });
  }, [studentName, subject]);

  function handleCloseCancelImpossibleModal() {
    setIsCancelImpossibleModalOpen(false);
  }

  function checkScheduleListExist() {
    return scheduleList?.length != 0;
  }

  function handleUpdateChange() {
    setIsUpdateOpen((iuo) => !iuo);
  }

  return (
    <>
      {openModal && selectedLesson && (
        <ModalSection $isCheckingModalOpen={isCheckingModalOpen}>
          <AttendanceCheckModal setIsCheckingModalOpen={setIsCheckingModalOpen} isUpdateOpen />
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
      <UpdateToggle onClick={handleUpdateChange}>{!isUpdateOpen ? "수정" : "취소"}</UpdateToggle>
      {checkScheduleListExist() ? (
        <ScheduleWrapper>
          {combinedClasses?.map(({ idx, date, status, startTime, endTime }: ScheduleListType, index: number) => (
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
              isUpdateOpen={isUpdateOpen}
            />
          ))}
        </ScheduleWrapper>
      ) : (
        <EmptyLesson> 아직 등록된 출결이 없어요</EmptyLesson>
      )}
    </>
  );
}

const UpdateToggle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2.3rem;
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body02};
`;

const GreyBox = styled.div`
  width: 32rem;
  height: 1.1rem;
  margin: 1.5rem 0 2.65rem -1.5rem;

  background-color: ${({ theme }) => theme.colors.grey50};
`;

const ScheduleWrapper = styled.section`
  /* overflow: scroll; */

  padding-bottom: 15rem;
`;

const ModalSection = styled.section<{ $isCheckingModalOpen: boolean }>`
  position: fixed;
  z-index: 3;
  top: 0;
  margin-left: -1.5rem;
`;

const CancelImpossibleModalWrapper = styled.aside`
  position: fixed;
  z-index: 10;
  top: 0;
  margin-left: -1.5rem;
`;

const EmptyLesson = styled.h1`
  color: ${({ theme }) => theme.colors.green5};
  ${({ theme }) => theme.fonts.title02};

  text-align: center;
`;
