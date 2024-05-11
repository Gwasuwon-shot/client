import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { deleteSchedule } from "../../../api/calendar/deleteSchedule";
import { removeTrashCan } from "../../../assets";
import { STUDENT_COLOR } from "../../../core/common/studentColor";
import useGetScheduleByUser from "../../../hooks/useGetScheduleByUser";
import useModal from "../../../hooks/useModal";
import { modalType } from "../../../type/calendar/modalType";
import { BasicDoubleModal } from "../../common";
import StudentColorBox from "../../common/StudentColorBox";
import ToastModal from "../../common/ToastModal";
import EditScheduleButton from "./EditScheduleButton";

export default function ChangeModal(props: modalType) {
  const { selectedDate, setOpenModal, formattedMonth } = props;
  const WEEKDAY: string[] = ["일", "월", "화", "수", "목", "금", "토"]; //TODO 이거 함수로 빼기
  const { isUserSchedule } = useGetScheduleByUser(formattedMonth);
  const queryClient = useQueryClient();
  const { unShowModal } = useModal();

  const [modalOn, setModalOn] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalContents, setModalContents] = useState({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth() + 1,
    day: selectedDate.getDate(),
    dayOfWeekKor: WEEKDAY[selectedDate.getDay()],
    startTime: "",
    endTime: "",
    studentName: "",
    subject: "",
    scheduleIdx: 0,
  });

  const { mutate: deleteScheduleStatus } = useMutation(() => deleteSchedule(modalContents.scheduleIdx), {
    onSuccess: () => {
      queryClient.refetchQueries("getScheduleByUser");
      setModalOn(false);
      unShowModal();
    },
    onError: () => {
      alert("일정 삭제에 실패했습니다.");
    },
  });

  function handleCloseButton() {
    setOpenModal(false);
    setIsEdit(false);
  }

  function handleClickEdit() {
    setIsEdit(true);
  }

  return (
    <>
      {modalOn && (
        <ConfirmModalWrapper>
          <BasicDoubleModal
            leftButtonName="취소"
            rightButtonName="삭제"
            handleClickLeftButton={() => setModalOn(false)}
            handleClickRightButton={() => deleteScheduleStatus()}>
            <ContentWrapper>
              {modalContents.year}년 {modalContents.month}월 {modalContents.day}일 {modalContents.dayOfWeekKor}요일{" "}
              <br />
              {modalContents.startTime} - {modalContents.endTime} <br /> {modalContents.studentName}(
              {modalContents.subject}
              )학생의 수업 일정을 <br /> 삭제할까요?
            </ContentWrapper>
          </BasicDoubleModal>
        </ConfirmModalWrapper>
      )}
      <ToastModal>
        <ModalContentWrapper>
          <ModalHeaderWrapper>
            <ModalDate>{format(selectedDate as Date, "M월 d일 EEEE", { locale: ko })}</ModalDate>
            {isEdit ? (
              <ModalButtonWrapper>
                <ModalButton onClick={handleCloseButton}>완료</ModalButton>
              </ModalButtonWrapper>
            ) : (
              <ModalButtonWrapper>
                <ModalButton onClick={handleClickEdit}>편집</ModalButton>
                <ModalButton onClick={handleCloseButton}>닫기</ModalButton>
              </ModalButtonWrapper>
            )}
          </ModalHeaderWrapper>

          {isUserSchedule
            ?.find((item) => isSameDay(new Date(item.date), selectedDate as Date))
            ?.dailyScheduleList.map((lesson) => {
              const { schedule, lessonIdx } = lesson;
              const { idx, subject, studentName, startTime, endTime } = schedule;
              useEffect(() => {
                setModalContents({
                  ...modalContents,
                  startTime: startTime,
                  endTime: endTime,
                  studentName: studentName,
                  subject: subject,
                  scheduleIdx: idx,
                });
              }, []);

              return (
                <ScheduleWrapper key={idx}>
                  <ScheduleContainer>
                    <StudentColorBox backgroundColor={STUDENT_COLOR[lessonIdx % 10]} />
                    <ModalTime>
                      {startTime} - {endTime}
                    </ModalTime>
                    <ModalName>{studentName}</ModalName>
                    <ModalSubject $backgroundcolor={STUDENT_COLOR[lessonIdx % 10]}>{subject}</ModalSubject>
                  </ScheduleContainer>

                  {isEdit && (
                    <ScheduleEditWrapper>
                      <EditScheduleButton
                        lessonIdx={lessonIdx}
                        schedule={schedule}
                        selectedDate={selectedDate}
                        idx={idx}
                      />
                      <RemoveSchedule onClick={() => setModalOn(true)} />
                    </ScheduleEditWrapper>
                  )}
                </ScheduleWrapper>
              );
            })}
        </ModalContentWrapper>
      </ToastModal>
    </>
  );
}

const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 29.3rem;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const ModalButton = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.grey400};
`;

const ModalContentWrapper = styled.article`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 29.2rem;
  margin-bottom: 2rem;
  height: auto;
  gap: 1.4rem;
`;

const ModalDate = styled.p`
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey700};
`;

const ScheduleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 29.3rem;
`;

const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9rem;
`;

const ModalTime = styled.p`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey300};
`;

const ModalName = styled.p`
  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey700};
`;

const ModalSubject = styled.span<{ $backgroundcolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1.6rem;
  padding: 0.2rem 0.6rem;

  background-color: ${(props) => props.$backgroundcolor};
  ${({ theme }) => theme.fonts.caption01};
  color: ${({ theme }) => theme.colors.grey500};
  border-radius: 0.8rem;
`;

const ScheduleEditWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const RemoveSchedule = styled(removeTrashCan)`
  width: 1.6rem;
  height: 1.6rem;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const ConfirmModalWrapper = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
`;
