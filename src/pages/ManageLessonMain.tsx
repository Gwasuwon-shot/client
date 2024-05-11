import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AddTreeCodeButtonManageIc } from "../assets";
import { attendanceStatus } from "../atom/attendanceCheck/attendanceStatus";
import { isModalOpen } from "../atom/common/isModalOpen";
import { isSnackBarOpen } from "../atom/common/isSnackBarOpen";
import CancelLessonMaintenanceSnackBar from "../components/common/CancelLessonMaintenanceSnackBar";
import TeacherFooter from "../components/common/TeacherFooter";
import DeleteLessonModal from "../components/manageLesson/DeleteLessonModal";
import ExtensionLessonModal from "../components/manageLesson/ExtensionLessonModal";
import FinishedLessons from "../components/manageLesson/FinishedLessons";
import MainLessons from "../components/manageLesson/MainLessons";
import MissingMainteanceLessons from "../components/manageLesson/MissingMainteanceLessons";
import SuccessLessonMaintenanceSnackBar from "../components/modal/SuccessLessonMaintenanceSanckBar";
import useGetAllLessons from "../hooks/useGetAllLessons";
import useGetMissingMaintenanceLesson from "../hooks/useGetMissingMaintenanceLesson";
import { lessonListType } from "../type/manageLesson/lessonListType";

export default function ManageLessonMain() {
  const [snackBarOpen, setSanckBarOpen] = useRecoilState(isSnackBarOpen);
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [isClickedDeleteButton, setIsClickedDeleteButton] = useState(false);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [isClickedMaintain, setIsClickedMaintain] = useState(false);
  const [isClickedMainteance, setIsClickedMainteance] = useState(false);

  const { lessonList } = useGetAllLessons();
  const { missingMaintenanceLessonList } = useGetMissingMaintenanceLesson();

  useEffect(() => {
    setAttendanceData({ idx: 0, status: "" });
  }, []);

  function finsihedLessons() {
    let teacherLessonList = lessonList.filter((element: lessonListType) => {
      element.isFinished !== false;
    });
    return teacherLessonList;
  }

  function handleMakeTreeCode() {
    navigate("/register-lesson");
  }

  function EditPageClick() {
    setIsClickedEdit(!isClickedEdit);
  }

  function handleConfirmDeleteLesson() {
    setIsClickedDeleteButton(true);
    setIsClickedMainteance(false);
    setOpenModal(true);
  }

  function handleConfirmMaintain() {
    setIsClickedDeleteButton(false);

    setOpenModal(true);
    setIsClickedMainteance(true);
  }

  const teacherLessonList = lessonList.filter((element: lessonListType) => {
    element.isFinished == false;
  });

  const finishedLessonList = lessonList.filter((element: lessonListType) => {
    element.isFinished == true;
  });
  return (
    <>
      {openModal && isClickedDeleteButton && (
        <DeleteLessonModal setIsClickedDeleteButton={setIsClickedDeleteButton} setOpenModal={setOpenModal} />
      )}
      {openModal && isClickedMainteance && (
        <ExtensionLessonModal setIsClickedMainteance={setIsClickedMainteance} setIsSuccess={setIsSuccess} />
      )}
      {snackBarOpen && isSuccess && <SuccessLessonMaintenanceSnackBar />}
      {snackBarOpen && !isSuccess && <CancelLessonMaintenanceSnackBar />}
      <MainLessonsWrapper>
        <MainLessonsHeader>수업관리</MainLessonsHeader>
        <TitleWrapper>
          <Title>나의 수업</Title>
          <EditButton onClick={EditPageClick}>{isClickedEdit ? "완료" : "편집"}</EditButton>
        </TitleWrapper>
        {missingMaintenanceLessonList && (
          <MissingMainteanceLessons
            handleConfirmDeleteLesson={handleConfirmDeleteLesson}
            isClickedEdit={isClickedEdit}
            handleConfirmMaintain={handleConfirmMaintain}
          />
        )}
        {teacherLessonList && (
          <MainLessons handleConfirmDeleteLesson={handleConfirmDeleteLesson} isClickedEdit={isClickedEdit} />
        )}
        {finishedLessonList && (
          <FinishedLessons handleConfirmDeleteLesson={handleConfirmDeleteLesson} isClickedEdit={isClickedEdit} />
        )}
      </MainLessonsWrapper>
      <AddLessonIconWrapper>
        <AddLessonIcon onClick={handleMakeTreeCode} />
      </AddLessonIconWrapper>

      <TeacherFooter />
    </>
  );
}

const AddLessonIconWrapper = styled.div`
  /* background-color: red; */
  padding-top: 1.8rem;
  width: 100vw;
  height: 15rem;
  text-align: center;
  margin-left: -1.4rem;
`;

const AddLessonIcon = styled(AddTreeCodeButtonManageIc)`
  width: 10rem;
  height: 3.6rem;
`;

const MainLessonsWrapper = styled.section`
  padding: 0 1.4rem 0rem 1.4rem;
`;

const MainLessonsHeader = styled.header`
  margin: 4rem 0 1.6rem;

  color: ${({ theme }) => theme.colors.grey900};

  ${({ theme }) => theme.fonts.title01};
`;

const Title = styled.h1`
  margin-bottom: 1.2rem;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.title02};
`;

const EditButton = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body02};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
