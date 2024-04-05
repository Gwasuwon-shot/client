import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { editDateState } from "../../../atom/EditSchedule/editDateState";
import { editSchedule } from "../../../atom/EditSchedule/editSchedule";

import { useRecoilState } from "recoil";
import { editDateStateTypes } from "../../../type/editSchedule/editDateType";
import { editScheduleType } from "../../../type/editSchedule/editScheduleType";

import { EditPencilIc } from "../../../assets";
import useGetAttendanceExist from "../../../hooks/useGetAttendanceExist";

import CannotEditModal from "./CannotEditModal";

interface editScheduleButtonType {
  lessonIdx: number;
  schedule: editScheduleType;
  selectedDate: Date;
  idx: number;
}

function EditScheduleButton(props: editScheduleButtonType) {
  const { lessonIdx, schedule, selectedDate, idx } = props;
  const [clickedSchedule, setClickedSchedule] = useRecoilState(editSchedule);
  const [willEditDate, setWillEditDate] = useRecoilState(editDateState);
  const WEEKDAY: string[] = ["일", "월", "화", "수", "목", "금", "토"];
  const { attendanceExist } = useGetAttendanceExist(idx);
  const [cannotEditModalOpen, setCannotEditModalOpen] = useState(false);
  const navigate = useNavigate();

  function moveClickEditPage({
    lessonIdx,
    schedule,
    selectedDate,
    idx,
  }: {
    lessonIdx: number;
    schedule: editScheduleType;
    selectedDate: Date;
    idx: number;
  }): void {
    const dayOfWeekNumber = selectedDate.getDay();
    const dayOfWeekKor = WEEKDAY[dayOfWeekNumber];

    setWillEditDate((prevState: editDateStateTypes) => ({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      date: selectedDate.getDate(),
      dayOfWeek: dayOfWeekKor,
    }));

    setClickedSchedule((prevState: editScheduleType) => ({
      ...prevState,
      idx: schedule?.idx,
      studentName: schedule?.studentName,
      subject: schedule?.subject,
      startTime: schedule?.startTime,
      endTime: schedule?.endTime,
    }));

    attendanceExist?.data ? setCannotEditModalOpen(true) : navigate("/edit-lessonschedule");
  }

  function ModalOpen() {
    setCannotEditModalOpen(true);
    console.log(cannotEditModalOpen);
    console.log(attendanceExist?.data);
  }

  return (
    <>
      <EditScheduleButtonWrapper
        onClick={() => moveClickEditPage({ lessonIdx, schedule, idx, selectedDate })}></EditScheduleButtonWrapper>
      {cannotEditModalOpen && <CannotEditModal setCannotEditModalOpen={setCannotEditModalOpen} />}
    </>
  );
}

export default EditScheduleButton;

const EditScheduleButtonWrapper = styled(EditPencilIc)`
  width: 1.6rem;
  height: 1.6rem;
`;
