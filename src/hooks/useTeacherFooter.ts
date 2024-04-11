import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { teacherFooterCategory } from "../atom/teacherFooterCategory";
import { TEACHER_FOOTER_CATEGORY } from "../core/teacherHome/teacherFooter";
import { TeacherFooterType } from "../type/teacherHome/teacherFooterType";

export default function useTeacherFooter() {
  const [teacherFooterList, setTeacherFooterList] = useRecoilState<TeacherFooterType[]>(teacherFooterCategory);
  const navigate = useNavigate();

  function handleMoveToPage(category: string) {
    setTeacherFooterList(
      teacherFooterList.map((list) =>
        list.category === category ? { ...list, isMoved: true } : { ...list, isMoved: false },
      ),
    );
    switch (category) {
      case TEACHER_FOOTER_CATEGORY.home:
        navigate("/home");
        break;
      case TEACHER_FOOTER_CATEGORY.calendar:
        navigate("/schedule");
        break;
      case TEACHER_FOOTER_CATEGORY.classManaging:
        navigate("/manage-lesson");
        break;
      case TEACHER_FOOTER_CATEGORY.my:
        navigate("/myPage");
        break;
      default:
        break;
    }
  }

  function handleChangeActive(category: string) {
    setTeacherFooterList(
      teacherFooterList.map((list) =>
        list.category === category ? { ...list, isMoved: true } : { ...list, isMoved: false },
      ),
    );
  }
  return { handleMoveToPage, handleChangeActive };
}
