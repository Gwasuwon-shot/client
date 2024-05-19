import { ParentsFooterType } from "../../type/parentsHome/ParentsFooterType";

export const PARENTS_FOOTER_CATEGORY = { home: "홈", calendar: "캘린더", my: "my" };

export const PARENTS_FOOTER: ParentsFooterType[] = [
  { id: 1, category: PARENTS_FOOTER_CATEGORY.home, isMoved: true },
  { id: 2, category: PARENTS_FOOTER_CATEGORY.calendar, isMoved: false },
  { id: 4, category: PARENTS_FOOTER_CATEGORY.my, isMoved: false },
];
