import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 모달 오픈여부 관리
export const openTimePickerState = atom<boolean>({
  key: "openTimePickerState",
  default: false,
});

export const openDatePickerState = atom<boolean>({
  key: "openDatePickerState",
  default: false,
});

export const openStartDetailState = atom<boolean>({
  key: "openStartDetailState",
  default: false,
});

export const openFinishDetailState = atom<boolean>({
  key: "openFinishDetailState",
  default: false,
});

// 회차 관리
export const cycleNumberState = atom<number>({
  key: "cycleNumberState",
  default: 0,
});

// 첫 수업일 관리
export const dateState = atom({
  key: "dateState",
  default: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate() },
});

export interface Day {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

// 확정 날짜들 관리
export const dayState = atom<Day[]>({
  key: "dayState",
  default: [
    {
      dayOfWeek: ["일", "월", "화", "수", "목", "금", "토"][new Date().getDay()],
      startTime: "12:00",
      endTime: "12:00",
    },
  ],
});

// 현재 선택중인 날짜 관리
export const focusDayState = atom({
  key: "focusDayState",
  default: "",
});

// 확정날짜 '저장' 시, 선택한 첫 수업일의 요일을 푸터에서 확인하기 위한 atom
export const firstLessonDay = atom({
  key: "firstLessonDay",
  default: { 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토", 0: "일" }[new Date().getDay()],
});

// 임시 날짜 저장 ('캘린더로 일정 확인')
export const temporarySchedule = atom({
  key: "temporarySchedule",
  default: [],

  effects_UNSTABLE: [persistAtom],
});
