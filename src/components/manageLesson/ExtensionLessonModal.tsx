import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { createLessonMaintenance } from "../../api/createLessonMaintenance";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { isSnackBarOpen } from "../../atom/common/isSnackBarOpen";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import useModal from "../../hooks/useModal";
import RoundBottomMiniButton from "../common/RoundBottomMiniButton";
import StudentNameLabel from "../common/StudentNameLabel";
import ToastModal from "../common/ToastModal";

interface ExtensionLessonModalProps {
  setIsClickedMainteance: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

interface createLessonMaintenanceProps {
  lessonIdx: number;
  isLessonMaintenance: boolean;
}

export default function ExtensionLessonModal(props: ExtensionLessonModalProps) {
  const { unShowModal } = useModal();
  const { setIsSuccess, setIsClickedMainteance } = props;
  const [snackBarOpen, setSnackBarOpen] = useRecoilState(isSnackBarOpen);
  const selectedLesson = useRecoilValue(attendanceLesson);
  const { studentName, subject, lessonIdx } = selectedLesson;

  const postInformationTrue = {
    lessonIdx: selectedLesson.lessonIdx,
    isLessonMaintenance: true,
  };

  const postInformationFalse = {
    lessonIdx: selectedLesson.lessonIdx,
    isLessonMaintenance: false,
  };

  const queryClient = useQueryClient();

  const { mutate: createNewLessonMaintenance } = useMutation(createLessonMaintenance, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("lessonByTeacher");
      queryClient.invalidateQueries("getMissingMaintenanceLesson");
    },
    onError: (error) => console.debug(error),
  });

  function handleExtensionLesson(info: createLessonMaintenanceProps) {
    createNewLessonMaintenance(info);
    setIsClickedMainteance(false);
    unShowModal();
    setSnackBarOpen(true);
    setIsSuccess(true);
  }

  function handleNotExtensionLesson(info: createLessonMaintenanceProps) {
    createNewLessonMaintenance(info);
    setIsClickedMainteance(false);

    unShowModal();
    setSnackBarOpen(true);
    setIsSuccess(false);
  }

  return (
    <ModalWrapper>
      <ToastModal>
        <ModalTitle>수업 회차 연장</ModalTitle>
        <TextWrapper>
          <StudentNameLabel
            studentName={studentName}
            subject={subject}
            backgroundColor={STUDENT_COLOR[lessonIdx % 10]}
            color="#757A80"
            isBig={false}
          />
        </TextWrapper>
        <TextWrapper>
          <p> 수업 회차가 모두 완료됐어요 </p>
          <p>수업을 계속해서 연장하시겠어요?</p>
        </TextWrapper>
        <ButtonWrapper>
          <RoundBottomMiniButton isGreen={false} onClick={() => handleNotExtensionLesson(postInformationFalse)}>
            아니요
          </RoundBottomMiniButton>
          <RoundBottomMiniButton isGreen={true} onClick={() => handleExtensionLesson(postInformationTrue)}>
            연장할래요
          </RoundBottomMiniButton>
        </ButtonWrapper>
      </ToastModal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: absolute;

  margin: -24rem 0 0 -1.5rem;
`;

const ModalTitle = styled.h1`
  margin: 1rem 0 1.6rem;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title02};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  width: 29.5rem;
  margin-top: 4.2rem;
`;
