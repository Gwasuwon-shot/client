import { styled } from "styled-components";
import {
  CalendarActiveTeacherFooterIc,
  CalendarTeacherFooterIc,
  HomeActiveTeacherFooterIc,
  HomeTeacherFooterIc,
  MyActiveTeacherFooterIc,
  MyTeacherFooterIc,
} from "../../assets";
import { PARENTS_FOOTER_CATEGORY } from "../../core/parentsHome/parentsFooter";

interface ParentsFooterIconsProps {
  category: string;
  isMoved: boolean;
}

export default function ParentsFooterIcons(props: ParentsFooterIconsProps) {
  const { category, isMoved } = props;

  switch (category) {
    case PARENTS_FOOTER_CATEGORY.home:
      return isMoved ? <HomeActiveTeacherFooterIcon /> : <HomeTeacherFooterIcon />;
    case PARENTS_FOOTER_CATEGORY.calendar:
      return isMoved ? <CalendarActiveTeacherFooterIcon /> : <CalendarTeacherFooterIcon />;
    case PARENTS_FOOTER_CATEGORY.my:
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

const MyActiveTeacherFooterIcon = styled(MyActiveTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
const MyTeacherFooterIcon = styled(MyTeacherFooterIc)`
  width: 5rem;
  height: 5rem;
`;
