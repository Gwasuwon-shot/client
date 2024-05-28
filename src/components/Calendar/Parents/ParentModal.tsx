import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import { STUDENT_COLOR } from "../../../core/common/studentColor";
import useGetScheduleByUser from "../../../hooks/useGetScheduleByUser";
import { modalType } from "../../../type/calendar/modalType";
import StudentColorBox from "../../common/StudentColorBox";
import ToastModal from "../../common/ToastModal";

export default function ParentModal(props: modalType) {
  const { selectedDate, setOpenModal, formattedMonth } = props;
  const { isUserSchedule } = useGetScheduleByUser(formattedMonth);

  return (
    <>
      <ToastModal>
        <ModalContentWrapper>
          <ModalDate>{format(selectedDate as Date, "M월 d일 EEEE", { locale: ko })}</ModalDate>
          {isUserSchedule
            ?.find((item) => isSameDay(new Date(item.date), selectedDate as Date))
            ?.dailyScheduleList.map((item) => {
              const { schedule, lessonIdx } = item;
              const { idx, studentName, subject, startTime, endTime } = schedule;

              return (
                <ScheduleWrapper key={idx}>
                  <StudentColorBox lessonIdx={lessonIdx} />
                  <ModalTime>
                    {startTime} - {endTime}
                  </ModalTime>
                  <ModalName>{studentName}</ModalName>
                  <ModalSubject $backgroundcolor={STUDENT_COLOR[lessonIdx % 10]}>{subject}</ModalSubject>
                </ScheduleWrapper>
              );
            })}
        </ModalContentWrapper>
      </ToastModal>
    </>
  );
}

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
