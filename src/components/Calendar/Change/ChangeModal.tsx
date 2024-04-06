import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import styled from "styled-components";
import { STUDENT_COLOR } from "../../../core/common/studentColor";
import useGetScheduleByUser from "../../../hooks/useGetScheduleByUser";
import StudentColorBox from "../../common/StudentColorBox";
import ToastModal from "../../common/ToastModal";
import EditScheduleButton from "./EditScheduleButton";

import { removeTrashCan } from "../../../assets";
import { modalType } from "../../../type/calendar/modalType";

export default function ChangeModal(props: modalType) {
  const { selectedDate, setOpenModal, formattedMonth } = props;
  const [isEdit, setIsEdit] = useState(false);
  const { isUserSchedule } = useGetScheduleByUser(formattedMonth);

  function handleCloseButton() {
    //update 로직 추가
    setOpenModal(false);
    setIsEdit(false);
  }

  function handleClickEdit() {
    setIsEdit(true);
  }

  return (
    <>
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
                      {/* 삭제 이벤트 추가 */}
                      <RemoveSchedule />
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

const RemoveSchedule = styled(removeTrashCan)`
  width: 1.6rem;
  height: 1.6rem;
`;

const ScheduleEditWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
`;
