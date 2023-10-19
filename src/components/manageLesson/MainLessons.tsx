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

  return (
    <>
      <MainLessonsWrapper>
        {lessonList &&
          lessonList?.map(({ idx, studentName, subject, percent, dayOfWeekList }: lessonListType) => (
            <MainLesson
              isClickedEdit={isClickedEdit}
              handleConfirmDeleteLesson={handleConfirmDeleteLesson}
              key={idx}
              idx={idx}
              studentName={studentName}
              subject={subject}
              percent={percent}
              dayOfWeekList={dayOfWeekList}
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
