import { styled } from "styled-components";
import useGetAllLessons from "../../hooks/useGetAllLessons";
import { lessonListType } from "../../type/manageLesson/lessonListType";
import MainLesson from "./MainLesson";

interface MainLessonsProp {
  isClickedEdit: boolean;
  handleConfirmDeleteLesson: () => void;
}

export default function MainLessons(props: MainLessonsProp) {
  const { isClickedEdit, handleConfirmDeleteLesson } = props;
  const { lessonList } = useGetAllLessons();

  let teacherLessonList = lessonList.filter((lesson: lessonListType) => {
    return lesson?.percent !== 100;
  });

  return (
    <>
      <MainLessonsWrapper>
        {teacherLessonList &&
          teacherLessonList?.map(({ idx, studentName, subject, percent, latestRegularSchedule }: lessonListType) => (
            <MainLesson
              isClickedEdit={isClickedEdit}
              handleConfirmDeleteLesson={handleConfirmDeleteLesson}
              key={idx}
              idx={idx}
              studentName={studentName}
              subject={subject}
              percent={percent}
              latestRegularSchedule={latestRegularSchedule}
            />
          ))}
      </MainLessonsWrapper>
    </>
  );
}

const MainLessonsWrapper = styled.article`
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  gap: 1.1rem;
`;
