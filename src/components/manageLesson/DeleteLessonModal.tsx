import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { deleteLesson } from "../../api/deleteLesson";
import { attendanceLesson } from "../../atom/attendanceCheck/attendanceLesson";
import { BasicDoubleModal } from "../common";

interface DeleteLessonModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickedDeleteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteLessonModal(props: DeleteLessonModalProps) {
  const { setIsClickedDeleteButton, setOpenModal } = props;
  const deleteConfirmLesson = useRecoilValue(attendanceLesson);
  const queryClient = useQueryClient();
  const { lessonIdx } = deleteConfirmLesson;

  const { mutate: deleteLessonStatus } = useMutation(
    () => deleteLesson(lessonIdx),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("lessonByTeacher");
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  function handleClickConfirmDelete(): void {
    deleteLessonStatus();
  }

  function handleBackToManageLessonPage() {
    setIsClickedDeleteButton(false);
    setOpenModal(false);
  }

  return (
    <>
      <BasicDoubleModal
        leftButtonName="취소"
        rightButtonName="확인"
        handleClickLeftButton={handleBackToManageLessonPage}
        handleClickRightButton={handleClickConfirmDelete}
      >
        <ModalQuestion>수업 삭제시, 모든 기록이 사라집니다 </ModalQuestion>
        <ModalQuestion>삭제하시겠어요?</ModalQuestion>
      </BasicDoubleModal>
    </>
  );
}

const ModalQuestion = styled.h2`
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};
`;
