import { useEffect } from "react";
import { styled } from "styled-components";
import { PARENTS_FOOTER_CATEGORY } from "../../core/parentsHome/parentsFooter";
import useGetLessonByUser from "../../hooks/useGetLessonByUser";
import useParentsFooter from "../../hooks/useParentsFooter";
import Header from "../common/Header";
import ParentsFooter from "../common/ParentsFooter";
import ManageClass from "./ManageClass";
import NoClassParentsHome from "./NoClassParentsHome";
import TodayClassSwiper from "./TodayClassSwiper";

export default function ParentsHome() {
  const { isLesson, userName } = useGetLessonByUser();

  const { handleChangeActive } = useParentsFooter();

  useEffect(() => {
    handleChangeActive(PARENTS_FOOTER_CATEGORY.home);
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Header />
        <WelComeTitle>
          {userName}님 <br /> 안녕하세요!
        </WelComeTitle>
      </HeaderWrapper>
      {isLesson ? (
        <ClassInfoWrapper>
          <TodayClassSwiper />
          <ManageClass />
        </ClassInfoWrapper>
      ) : (
        <NoClassParentsHome />
      )}

      <ParentsFooter />
    </>
  );
}

const HeaderWrapper = styled.header`
  margin-left: 1.8rem;
  margin-top: 4rem;
`;

const WelComeTitle = styled.h1`
  margin-top: 2rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const ClassInfoWrapper = styled.main`
  width: 100%;
`;
