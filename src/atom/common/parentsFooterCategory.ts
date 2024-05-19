import { atom } from "recoil";
import { PARENTS_FOOTER, PARENTS_FOOTER_CATEGORY } from "../../core/parentsHome/parentsFooter";
import { ParentsFooterType } from "../../type/parentsHome/ParentsFooterType";

export const parentsFooterCategory = atom<ParentsFooterType[]>({
  key: "parentsFooterCategory",
  default: PARENTS_FOOTER,
});
