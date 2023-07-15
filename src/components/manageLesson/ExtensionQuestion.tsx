import React from "react";
import { styled } from "styled-components";
import { BellwithAlarmIc } from "../../assets";
import StudentColorBox from "../common/StudentColorBox";
import { MISSING_MAINTEANANCE_LESSON } from "../../core/manageLesson/getMissingMaintenanceLesson";
import { STUDENT_COLOR } from "../../core/common/studentColor";
import SubjectLabel from "../common/SubjectLabel";
import { NextMonthArrowButton } from "../../assets";

export default function ExtensionQuestion() {
  const { missingMaintenanceLessonList } = MISSING_MAINTEANANCE_LESSON.data;

  return (
    <>
      <ExtensionWrapper>
        <ExtentionHeader>
          <BellIcon />
          <HeaderText>수업연장 여부를 알려주세요!</HeaderText>
        </ExtentionHeader>
        <Content>
          {missingMaintenanceLessonList.map((item) => {
            const { lesson, endScheduleDate } = item;
            const { idx, studentName, subject, count } = lesson;

            return (
              <ContentWrapper key={idx}>
                <StudentColorBox backgroundColor={STUDENT_COLOR[idx % 11]} />
                <DateandCount>
                  {endScheduleDate.slice(5, 6) == "0" ? (
                    <p>
                      {endScheduleDate.slice(6, 7)} . {endScheduleDate.slice(8, 10)}
                    </p>
                  ) : (
                    <p>
                      {endScheduleDate.slice(5, 7)} .{endScheduleDate.slice(8, 10)}
                    </p>
                  )}
                  <p>{count} 회차 종료 </p>
                </DateandCount>
                <NameandSubject>
                  <Name>{studentName}</Name>
                  <SubjectLabel subject={subject} backgroundColor={STUDENT_COLOR[idx % 11]} color="#5B6166" />
                </NameandSubject>
                <SlideButton />
              </ContentWrapper>
            );
          })}
        </Content>
      </ExtensionWrapper>
      <GreyBar />
    </>
  );
}

const ExtensionWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  width: 29.2rem;
  height: 9.5rem;
  padding-left: 1rem;
  margin-bottom: 2.4rem;

  border: 1px solid ${({ theme }) => theme.colors.green5};
  gap: 0.3rem;
  border-radius: 8px;
`;

const ExtentionHeader = styled.header`
  display: flex;
  gap: 0.6rem;
`;

const BellIcon = styled(BellwithAlarmIc)`
  width: 2rem;
  height: 2rem;
`;

const HeaderText = styled.h1`
  ${({ theme }) => theme.fonts.body01}
  color: ${({ theme }) => theme.colors.grey900};
`;

const Content = styled.div`
  display: flex;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 1.8rem;
  flex: 0 0 auto;

  align-items: center;

  width: 27rem;
`;
const DateandCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1.8rem;

  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;

const Name = styled.h3`
  ${({ theme }) => theme.fonts.body01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const NameandSubject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const SlideButton = styled(NextMonthArrowButton)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const GreyBar = styled.div`
  width: 100%;
  height: 1.1rem;
  margin-bottom: 2.4rem;

  background-color: ${({ theme }) => theme.colors.grey50};
`;
