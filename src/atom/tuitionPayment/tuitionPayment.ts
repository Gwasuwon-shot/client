import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Day } from "../timePicker/timePicker";
const { persistAtom } = recoilPersist();

export const payingPersonName = atom<string>({
  key: "payingPersonName",
  default: "",
});

export const accountNumber = atom<string>({
  key: "accountNumber",
  default: "",
});

export const bankName = atom<string>({
  key: "bankName",
  default: "",
});

export const moneyAmount = atom<number>({
  key: "moneyAmount",
  default: 0,
});

export const paymentOrder = atom<string>({
  key: "paymentOrder",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

interface scheduleListProps {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface lessonInputDataProps {
  lesson: {
    studentName: string;
    subject: string;
    payment: string;
    amount: number;
    count: number;
    startDate: string;
    regularScheduleList: Day[];
  };
  account: {
    name: string;
    bank: string;
    number: string;
  };
}

// 개별 아이템 다 이거로 바꿔끼기
export const lessonInputData = atom<lessonInputDataProps>({
  key: "lessonInputData",
  default: {
    lesson: {
      studentName: "",
      subject: "",
      payment: "",
      amount: 0,
      count: 0,
      startDate: "",
      regularScheduleList: [
        {
          dayOfWeek: "",
          startTime: "",
          endTime: "",
        },
      ],
    },
    account: {
      name: "",
      bank: "",
      number: "",
    },
  },
  effects_UNSTABLE: [persistAtom],
});

interface lessonCodeAndPaymentIdProp {
  lessonCode: string;
  paymentRecordIdx: number;
  lessonidx: number;
}

export const lessonCodeAndPaymentId = atom<lessonCodeAndPaymentIdProp>({
  key: "lessonCodeAndPaymentId",
  default: {
    lessonCode: "",
    paymentRecordIdx: -1,
    lessonidx: -1,
  },
  effects_UNSTABLE: [persistAtom],
});
