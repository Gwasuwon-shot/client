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
import { TEACHER_FOOTER_CATEGORY } from "../../core/teacherHome/teacherFooter";

interface TeacherFooterIconsProps {
  category: string;
  isMoved: boolean;
}

export default function TeacherFooterIcons(props: TeacherFooterIconsProps) {
  const { category, isMoved } = props;

  switch (category) {
    case TEACHER_FOOTER_CATEGORY.home:
      return isMoved ? <HomeActiveTeacherFooterIcon /> : <HomeTeacherFooterIcon />;
    case TEACHER_FOOTER_CATEGORY.calendar:
      return isMoved ? <CalendarActiveTeacherFooterIcon /> : <CalendarTeacherFooterIcon />;
    case TEACHER_FOOTER_CATEGORY.classManaging:
      return isMoved ? <ClassManagingActiveTeacherFooterIcon /> : <ClassManagingTeacherFooterIcon />;
    case TEACHER_FOOTER_CATEGORY.my:
      return isMoved ? <MyActiveTeacherFooterIcon /> : <MyTeacherFooterIcon />;
    default:
      return;
  }
}

const HomeActiveTeacherFooterIcon = styled(HomeActiveTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;

const HomeTeacherFooterIcon = styled(HomeTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const CalendarActiveTeacherFooterIcon = styled(CalendarActiveTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const CalendarTeacherFooterIcon = styled(CalendarTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const ClassManagingActiveTeacherFooterIcon = styled(ClassManagingActiveTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const ClassManagingTeacherFooterIcon = styled(ClassManagingTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const MyActiveTeacherFooterIcon = styled(MyActiveTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const MyTeacherFooterIcon = styled(MyTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
