import { studentNameState, subjectNameState } from "../../atom/common/datePicker";

import ProgressBar from "../common/ProgressBar";
import React from "react";
import { RegisterLessonHeaderIc } from "../../assets";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CustomBackButton from "../common/CustomBackButton";

export default function Header() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useRecoilState<string>(studentNameState);
  const [subjectName, setSubjectName] = useRecoilState<string>(subjectNameState);

  function handleMoveToBack() {
    setStudentName("");
    setSubjectName("");
    navigate(-1);
  }

  return (
    <HeaderWrapper>
      <CustomBackButton onClick={handleMoveToBack} />
      <ProgressBar progress={16.6} />
      <InputHeader>
        학생의 이름과 <br /> 과목을 입력해주세요. <Emphasis> * </Emphasis>
      </InputHeader>
      <InputNotice> 수업관리를 도와드릴 수 있도록 몇가지 정보를 알려주세요.</InputNotice>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;

  height: 15.8rem;
  margin-top: 2rem;
`;

const InputHeader = styled.h1`
  display: flex;

  margin-top: 2.2rem;
  margin-left: 1.6rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;

const Emphasis = styled.span`
  display: flex;
  align-items: flex-end;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.green5};
`;

const InputNotice = styled.h2`
  display: flex;

  margin-top: 1.1rem;
  margin-left: 1.6rem;

  ${({ theme }) => theme.fonts.body05};
  color: ${({ theme }) => theme.colors.grey600};
`;
