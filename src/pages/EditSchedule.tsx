import EditPageFooter from "../components/EditSchedule/EditPageFooter";
import EditPageLessonInformation from "../components/EditSchedule/EditPageLessonInformation";
import EditPageStudentInformation from "../components/EditSchedule/EditPageStudentInformation";
import EditPageTime from "../components/EditSchedule/EditPageTime";
import Header from "../components/EditSchedule/Header";

//캘린더에서 수정을 눌렀을 때 나오는 페이지
export default function EditSchedule() {
  return (
    <>
      <Header />
      <EditPageStudentInformation />
      <EditPageLessonInformation />
      <EditPageTime />
      <EditPageFooter />
    </>
  );
}
