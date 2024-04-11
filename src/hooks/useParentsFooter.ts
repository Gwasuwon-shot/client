import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { parentsFooterCategory } from "../atom/common/parentsFooterCategory";
import { PARENTS_FOOTER_CATEGORY } from "../core/parentsHome/parentsFooter";
import { ParentsFooterType } from "../type/parentsHome/ParentsFooterType";

export default function useParentsFooter() {
  const [parentsFooterList, setParentsFooterList] = useRecoilState<ParentsFooterType[]>(parentsFooterCategory);
  const navigate = useNavigate();

  function handleMoveToPage(category: string) {
    setParentsFooterList(
      parentsFooterList.map((list) =>
        list.category === category ? { ...list, isMoved: true } : { ...list, isMoved: false },
      ),
    );
    switch (category) {
      case PARENTS_FOOTER_CATEGORY.home:
        navigate("/home");
        break;
      case PARENTS_FOOTER_CATEGORY.calendar:
        navigate("/parent-calendar");
        break;
      case PARENTS_FOOTER_CATEGORY.my:
        navigate("/myPage");
        break;
      default:
        break;
    }
  }

  function handleChangeActive(category: string) {
    setParentsFooterList(
      parentsFooterList.map((list) =>
        list.category === category ? { ...list, isMoved: true } : { ...list, isMoved: false },
      ),
    );
  }
  return { handleMoveToPage, handleChangeActive };
}
