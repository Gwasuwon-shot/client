import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { BANK_INFO, CLASS_INFO } from "../../core/Parents/lessonInfo";
import useGetLessonAccount from "../../hooks/useGetLessonAccount";
import useGetLessonDetail from "../../hooks/useGetLessonDetail";
import useGetLessonRegularSchedule from "../../hooks/useGetLessonRegularSchedule";
import LessonInfoItemLayout from "./LessonInfoItemLayout";

interface LessonInfoListProp {
  state: boolean;
}

interface ScheduleType {
  dayOfWeekList: string[];
  startTime: string;
  endTime: string;
}

export default function LessonInfoList(props: LessonInfoListProp) {
  const { state } = props;
  //커스텀 훅에서 account 객체 값 배열로 만들어서 리턴
  const { lessonId } = useParams();
  const { amount, payment, startDate, teacherName } = useGetLessonDetail(Number(lessonId));
  const { accountInfo } = useGetLessonAccount(Number(lessonId));
  const { lessonRegularSchedule } = useGetLessonRegularSchedule(Number(lessonId));

  return (
    <>
      <LessonInfoMainCategory>정기수업 일시</LessonInfoMainCategory>
      <ScheduleBox>
        {lessonRegularSchedule.map(({ dayOfWeekList, startTime, endTime }: ScheduleType) => {
          return (
            <RegularSchedule>
              <Days>
                {dayOfWeekList?.map((day: string, index: number) => (
                  <>
                    {day}
                    <Comma $isLast={index === dayOfWeekList.length - 1}>,</Comma>
                  </>
                ))}
              </Days>
              {startTime} - {endTime}
            </RegularSchedule>
          );
        })}
      </ScheduleBox>
      {!state && (
        <>
          <LessonInfoMainCategory>선생님</LessonInfoMainCategory>
          <LessonInfoItemLayout detailCategory="이름" content={teacherName} />
        </>
      )}

      <LessonInfoMainCategory>은행</LessonInfoMainCategory>
      {[accountInfo?.bank, accountInfo?.number]?.map((info: string, idx: number) => {
        return (
          <LessonInfoItemLayout isBankAccount={idx === 1} key={idx} detailCategory={BANK_INFO[idx]} content={info} />
        );
      })}
      <LessonInfoMainCategory>수업진행</LessonInfoMainCategory>
      {[startDate, payment, amount].map((classInfo, idx) => {
        return <LessonInfoItemLayout key={idx} detailCategory={CLASS_INFO[idx]} content={classInfo} />;
      })}
    </>
  );
}

const Days = styled.div`
  display: flex;
  margin-right: 1.2rem;
`;

const RegularSchedule = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.body02};
`;

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2.2rem 1.4rem;
  gap: 0.8rem;
`;

const Comma = styled.p<{ $isLast: boolean }>`
  margin-right: 0.5rem;
  display: ${({ $isLast }) => ($isLast ? "none" : "block")};
`;

const LessonInfoMainCategory = styled.div`
  width: 100%;
  height: 2.6rem;
  padding: 0.5rem 1.4rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey500};

  background-color: ${({ theme }) => theme.colors.grey20};
`;
