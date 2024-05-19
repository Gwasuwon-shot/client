import { styled } from "styled-components";
import MissingMainteanceLesson from "./MissingMainteanceLesson";
import useGetAllLessons from "../../hooks/useGetAllLessons";
import useGetMissingMaintenanceLesson from "../../hooks/useGetMissingMaintenanceLesson";

interface MissingLessonProp {
  lesson: {
    count: number;
    idx: number;
    studentName: string;
    subject: string;
  };
}

interface MissingMainteanceLessonsProps {
  isClickedEdit: boolean;
  handleConfirmDeleteLesson: () => void;
  handleConfirmMaintain: () => void;
}

export default function MissingMainteanceLessons(props: MissingMainteanceLessonsProps) {
  const { isClickedEdit, handleConfirmDeleteLesson, handleConfirmMaintain } = props;
  const { missingMaintenanceLessonList } = useGetMissingMaintenanceLesson();

  return (
    <>
      <MissingMainteanceLessonWrapper>
        {missingMaintenanceLessonList &&
          missingMaintenanceLessonList?.map(({ lesson }: MissingLessonProp) => (
            <MissingMainteanceLesson
              handleConfirmMaintain={handleConfirmMaintain}
              handleConfirmDeleteLesson={handleConfirmDeleteLesson}
              isClickedEdit={isClickedEdit}
              key={lesson?.idx}
              idx={lesson?.idx}
              studentName={lesson?.studentName}
              subject={lesson?.subject}
            />
          ))}
      </MissingMainteanceLessonWrapper>
    </>
  );
}

const MissingMainteanceLessonWrapper = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
`;
