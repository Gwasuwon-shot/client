import { styled } from "styled-components";
import PastLessonRecord from "./PastLessonRecord";
import { useParams } from "react-router-dom";
import { PastLessonRecordType } from "../../type/lessonRecord/lessonRecord";
import useGetLessonSchedule from "../../hooks/useGetLessonSchedule";

export default function PastLessonRecordList() {
  const { lessonId } = useParams();
  const { scheduleList } = useGetLessonSchedule(Number(lessonId));

  return (
    <PastLessonRecordListWrapper>
      {scheduleList?.map(({ idx, date, startTime, endTime, status }: PastLessonRecordType, index: number) => {
        return (
          <PastLessonRecord
            count={Math.abs(index - scheduleList?.length)}
            key={idx}
            date={date}
            startTime={startTime}
            endTime={endTime}
            status={status}
          />
        );
      })}
    </PastLessonRecordListWrapper>
  );
}

const PastLessonRecordListWrapper = styled.section`
  width: 29.2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem;
  margin-bottom: 8rem;
`;
