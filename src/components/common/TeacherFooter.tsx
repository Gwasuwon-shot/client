import { useState } from "react";
import styled from "styled-components";
import {
  CalendarActiveTeacherFooterIc,
  CalendarTeacherFooterIc,
  ClassManagingActiveTeacherFooterIc,
  ClassManagingTeacherFooterIc,
  HomeActiveTeacherFooterIc,
  HomeTeacherFooterIc,
  MyActiveTeacherFooterIc,
  MyTeacherFooterIc,
} from "../../assets";
import { TEACHER_FOOTER, TEACHER_FOOTER_CATEGORY } from "../../core/teacherFooter";
import { TeacherFooterType } from "../../type/teacherFooterType";

export default function TeacherFooter() {
  const [teacherFooterList, setTeacherFooterList] = useState<TeacherFooterType[]>(TEACHER_FOOTER);

  function showTeacherFooterIcon(category: string, isMoved: boolean) {
    switch (category) {
      case TEACHER_FOOTER_CATEGORY.home:
        return isMoved ? <HomeActiveTeacherFooterIc /> : <HomeTeacherFooterIc />;
      case TEACHER_FOOTER_CATEGORY.calendar:
        return isMoved ? <CalendarActiveTeacherFooterIc /> : <CalendarTeacherFooterIc />;
      case TEACHER_FOOTER_CATEGORY.classManaging:
        return isMoved ? <ClassManagingActiveTeacherFooterIc /> : <ClassManagingTeacherFooterIc />;
      case TEACHER_FOOTER_CATEGORY.my:
        return isMoved ? <MyActiveTeacherFooterIc /> : <MyTeacherFooterIc />;
      default:
        return;
    }
  }

  function handleMoveToPage(id: number) {
    setTeacherFooterList(
      teacherFooterList.map((list) => (list.id === id ? { ...list, isMoved: true } : { ...list, isMoved: false })),
    );
  }

  return (
    <TeacherFooterWrapper>
      {teacherFooterList.map(({ id, category, isMoved }) => (
        <i key={id} onClick={() => handleMoveToPage(id)}>
          {showTeacherFooterIcon(category, isMoved)}
        </i>
      ))}
    </TeacherFooterWrapper>
  );
}

const TeacherFooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 10;

  width: 32rem;
  height: 7.2rem;
  padding: 0.3rem 1.5rem 1.9rem;

  background: ${({ theme }) => theme.colors.grey0};

  flex-shrink: 0;

  border-radius: 18px 18px 0 0;

  border-top: 1px solid ${({ theme }) => theme.colors.grey50};

  box-shadow: 0 0 0.5rem 0 rgb(56 62 68 / 8%);
`;
