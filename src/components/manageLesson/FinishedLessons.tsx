import { styled } from "styled-components";
import useGetAllLessons from "../../hooks/useGetAllLessons";
import { lessonListType } from "../../type/manageLesson/lessonListType";
import FinishedLesson from "./FinishedLesson";

interface FinishedLessonsProp {
  isClickedEdit: boolean;
  handleConfirmDeleteLesson: () => void;
}

export default function FinishedLessons(props: FinishedLessonsProp) {
  const { isClickedEdit, handleConfirmDeleteLesson } = props;
  const { lessonList } = useGetAllLessons();

  let finsihedLessonList = lessonList.filter((lesson: lessonListType) => {
    return lesson?.isFinished == true;
  });

  return (
    <>
      <MainLessonsWrapper>
        {finsihedLessonList &&
          finsihedLessonList?.map(({ idx, studentName, subject, percent, latestRegularSchedule }: lessonListType) => (
            <FinishedLesson
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
