import { client } from "./axios";
import { getCookie } from "./cookie";

interface scheduleListProps {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface createLessonProps {
  lesson: {
    studentName: string;
    subject: string;
    payment: string;
    amount: number;
    count: number;
    startDate: string;
    regularScheduleList: scheduleListProps[];
  };
  account: {
    // name: string;
    bank: string;
    number: string;
  };
}

export async function createLesson(props: createLessonProps) {
  const { lesson, account } = props;
  const { studentName, subject, payment, amount, count, startDate, regularScheduleList } = lesson;
  const { bank, number } = account;

  const data = await client.post(
    `/api/lesson`,
    {
      lesson: {
        studentName: studentName,
        subject: subject,
        payment: payment,
        amount: amount,
        count: count,
        startDate: startDate,
        regularScheduleList: regularScheduleList,
      },
      account: {
        // name: name,
        bank: bank,
        number: number,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

  return data?.data?.data;
}
