import { RegularLessonCalenderIc } from "../../assets";
import { studentNameState, subjectNameState } from "../../atom/common/datePicker";
import {
  cycleNumberState,
  dateState,
  dayState,
  firstLessonDay,
  temporarySchedule,
} from "../../atom/timePicker/timePicker";

import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getTemporarySchedule } from "../../api/getTemporarySchedule";
import SelectedDayAndTime from "./SelectedDayAndTime";

interface DayProp {
  $isSelected: boolean;
}

interface Day {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface temporaryProp {
  studentName: string;
  subject: string;
  count: number;
  startDate: string;
  regularScheduleList: Day[];
}

export default function LessonDate() {
  const navigate = useNavigate();

  // 1. 요일 관리

  const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

  const [selectedDays, setSelectedDays] = useRecoilState(dayState);
  const [firstLesson, setfirstLesson] = useRecoilState(firstLessonDay);

  function handleDayButton(day: string) {
    setSelectedDays((prevSelectedDays) => {
      const existingDayIndex = prevSelectedDays.findIndex((selectedDay) => selectedDay.dayOfWeek === day);
      // TODO 오늘 삭제 안되는 로직 임시해결 : 왜 있는 코드인지 확인하기
      // if (day == firstLesson) {
      //   if (existingDayIndex === -1) {
      //     return [...prevSelectedDays, { dayOfWeek: day, startTime: "12:00", endTime: "12:00" }];
      //   } else {
      //     return [...prevSelectedDays];
      //   }
      // } else
      // {
      if (existingDayIndex !== -1) {
        const newSelectedDays = [...prevSelectedDays];
        newSelectedDays.splice(existingDayIndex, 1);
        return newSelectedDays;
      } else {
        return [...prevSelectedDays, { dayOfWeek: day, startTime: "12:00", endTime: "12:00" }];
      }
      // }
    });
  }

  // post 로직 추가

  const [studentName, setStudentName] = useRecoilState(studentNameState);
  const [subject, setSubject] = useRecoilState(subjectNameState);
  const [count, setCount] = useRecoilState(cycleNumberState);
  const [scheduleDate, setscheduleDate] = useRecoilState(dateState);
  const startDate = `${scheduleDate.year}-${String(scheduleDate.month).padStart(2, "0")}-${String(
    scheduleDate.date,
  ).padStart(2, "0")}`;
  const [tempSchedule, setTempSchedule] = useRecoilState(temporarySchedule);

  const postInformation: temporaryProp = {
    studentName: studentName,
    subject: subject,
    count: count,
    startDate: startDate,
    regularScheduleList: selectedDays,
  };

  const { mutate: getNewTemporarySchedule } = useMutation(getTemporarySchedule, {
    onSuccess: (response) => {
      setTempSchedule(response);
      navigate("/register-calendar");
    },

    onError: (error) => console.debug(error),
  });

  function postTemporary(info: temporaryProp) {
    getNewTemporarySchedule(postInformation);
  }

  return (
    <LessonDateWrapper>
      <IconWrapper>
        <SectionName> 일정 등록 </SectionName>
      </IconWrapper>

      <DayWrapper>
        {DAYS.map((day, index) => (
          <Day
            key={index}
            onClick={() => handleDayButton(day)}
            $isSelected={selectedDays.some((selectedDay) => selectedDay.dayOfWeek === day)}>
            {day}
          </Day>
        ))}
      </DayWrapper>

      {selectedDays.map((day, index) => (
        <SelectedDayAndTime key={index} dayofweek={day.dayOfWeek} startTime={day.startTime} endTime={day.endTime} />
      ))}

      <ModalWrapper>
        <RegularLessonCalenderIcon />
        <ModalButton onClick={() => postTemporary(postInformation)}>캘린더 확인하기</ModalButton>
      </ModalWrapper>
    </LessonDateWrapper>
  );
}

const LessonDateWrapper = styled.section``;

const IconWrapper = styled.div`
  display: flex;

  height: 3.1rem;
`;

const SectionName = styled.h1`
  margin-left: 1.8rem;
  margin-top: 2rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey300};
`;

const DayWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 0.4rem;

  margin-top: 1rem;
  padding-top: 0.5rem;
  margin-bottom: 2rem;
`;

const Day = styled.button<DayProp>`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey300};
  background-color: ${({ theme }) => theme.colors.grey50};
  ${({ $isSelected, theme }) => $isSelected && `background-color: ${theme.colors.green4}`};
  ${({ $isSelected, theme }) => $isSelected && `color: ${theme.colors.white}`};
`;

const ModalWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
`;

const RegularLessonCalenderIcon = styled(RegularLessonCalenderIc)``;

const ModalButton = styled.button`
  margin-left: 0.3rem;
  text-decoration: underline;
  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey400};
`;
