import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AddTreeCodeButtonManageIc } from "../assets";
import { attendanceStatus } from "../atom/attendanceCheck/attendanceStatus";
import { isSnackBarOpen } from "../atom/common/isSnackBarOpen";
import CancelLessonMaintenanceSnackBar from "../components/common/CancelLessonMaintenanceSnackBar";
import TeacherFooter from "../components/common/TeacherFooter";
import ExtensionQuestion from "../components/manageLesson/ExtensionQuestion";
import MainLessons from "../components/manageLesson/MainLessons";
import SuccessLessonMaintenanceSanckBar from "../components/modal/SuccessLessonMaintenanceSanckBar";
import useGetMissingMaintenanceLesson from "../hooks/useGetMissingMaintenanceLesson";
import { ManageLessonEditIc } from "../assets";
import MissingMainteanceLessons from "../components/manageLesson/MissingMainteanceLessons";
import { BasicDoubleModal } from "../components/common";
import { isModalOpen } from "../atom/common/isModalOpen";
import ExtensionLessonModal from "../components/manageLesson/ExtensionLessonModal";
import DeleteLessonModal from "../components/manageLesson/DeleteLessonModal";

export default function ManageLessonMain() {
  const [snackBarOpen, setSanckBarOpen] = useRecoilState(isSnackBarOpen);
  const [isSucces, setIsSuccess] = useState(true);
  const { missingMaintenanceLessonList } = useGetMissingMaintenanceLesson();
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [isClickedDeleteButton, setIsClickedDeleteButton] = useState(false);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [isClickedMaintain, setIsClickedMaintain] = useState(false);

  useEffect(() => {
    setAttendanceData({ idx: 0, status: "" });
  }, []);

  function checkMissingMaintenanceLessonExist() {
    return missingMaintenanceLessonList?.length !== 0;
  }

  function handleMakeTreeCode() {
    navigate("/register-lesson");
  }

  function EditPageClick() {
    setIsClickedEdit(!isClickedEdit);
  }

  function handleConfirmDeleteLesson() {
    setIsClickedDeleteButton(true);
    setOpenModal(true);
  }

  function handleConfirmMaintain() {
    setOpenModal(true);
    setIsClickedMaintain(true);
  }

  return (
    <>
      {openModal && isClickedDeleteButton && (
        <DeleteLessonModal setIsClickedDeleteButton={setIsClickedDeleteButton} setOpenModal={setOpenModal} />
      )}
      {openModal && isClickedMaintain && <ExtensionLessonModal />}
      {snackBarOpen && isSucces && <SuccessLessonMaintenanceSanckBar />}
      {snackBarOpen && !isSucces && <CancelLessonMaintenanceSnackBar />}
      <MainLessonsWrapper>
        <MainLessonsHeader>수업관리</MainLessonsHeader>
        <TitleWrapper>
          <Title>나의 수업</Title>
          <EditButton onClick={EditPageClick}>{isClickedEdit ? "완료" : "편집"}</EditButton>
        </TitleWrapper>
        {checkMissingMaintenanceLessonExist() && (
          <MissingMainteanceLessons
            handleConfirmDeleteLesson={handleConfirmDeleteLesson}
            isClickedEdit={isClickedEdit}
            handleConfirmMaintain={handleConfirmMaintain}
          />
        )}
        <MainLessons handleConfirmDeleteLesson={handleConfirmDeleteLesson} isClickedEdit={isClickedEdit} />

        <AddTreeCodeButtonManageIcon onClick={handleMakeTreeCode} />
      </MainLessonsWrapper>

      <TeacherFooter />
    </>
  );
}

const AddTreeCodeButtonManageIcon = styled(AddTreeCodeButtonManageIc)`
  width: 11.2rem;
  height: 3.6rem;
  margin-top: 1.8rem;
  margin-left: 9rem;
`;

const MainLessonsWrapper = styled.section`
  padding: 0 1.4rem 13rem 1.4rem;
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
