import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { styled } from "styled-components";
import { TODAY_CLASS_SLIDER_SETTINGS } from "../../core/parentsHome/parentsHome";
import useGetTodayScheduleByParents from "../../hooks/useGetTodayScheduleByParents";
import TodayClassScedule from "./TodayClassScedule";

interface calssInfoType {
  idx: number;
  teacherName: string;
  studentName: string;
  startTime: string;
  endTime: string;
  subject: string;
}

export default function TodayClassSwiper() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const dayOfWeekStr = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeekKor = dayOfWeekStr[dayOfWeek];

  const { scheduleList } = useGetTodayScheduleByParents();

  return (
    <>
      {scheduleList?.length > 0 && (
        <div>
          <SwiperTitleDate>
            {year}년 {month}월 {day}일 ({dayOfWeekKor}) 수업
          </SwiperTitleDate>
          <Slider {...TODAY_CLASS_SLIDER_SETTINGS}>
            {scheduleList.map((classInfo: calssInfoType) => {
              const { idx, studentName, startTime, endTime, teacherName, subject } = classInfo;
              return (
                <TodayClassScedule
                  key={idx}
                  studentName={studentName}
                  startTime={startTime}
                  endTime={endTime}
                  teacherName={teacherName}
                  subject={subject}
                  classCount={idx}
                />
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
}

const SwiperTitleDate = styled.p`
  margin-top: 1.6rem;
  margin-left: 1.8rem;

  ${({ theme }) => theme.fonts.body07};
  color: ${({ theme }) => theme.colors.grey600};
`;
