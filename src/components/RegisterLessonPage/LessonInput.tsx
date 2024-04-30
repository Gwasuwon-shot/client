import { ChangeEvent, useState } from "react";
import { studentNameState, subjectNameState } from "../../atom/common/datePicker";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import { RegisterLessonInputIc } from "../../assets";

interface NameInputSectionProp {
  $nameFocused: boolean;
}

const SUBJECTS = [
  { name: "국어" },
  { name: "영어" },
  { name: "수학" },
  { name: "사회" },
  { name: "과학" },
  { name: "논술" },
  { name: "미술" },
  { name: "음악" },
];

export default function LessonInput() {
  // 1. 학생이름 / 과목이름에 Focus 되었는지 여부 관리
  const [isNameInputFocused, setNameInputFocused] = useState(false);
  const [isSubjectInputFocused, setSubjectInputFocused] = useState(false);

  // 2. 학생이름, 과목이름 입력값 관리 (recoil)
  const [studentName, setStudentName] = useRecoilState<string>(studentNameState);
  const [subjectName, setSubjectName] = useRecoilState<string>(subjectNameState);

  const handleNameInputFocus = () => {
    setSubjectInputFocused(false);
    setNameInputFocused(true);
  };

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  // 3. 이름 2자 이하 경고메시지 관련 변수

  const isNameValid = studentName.length >= 2;

  const isWarning = !isNameValid && studentName.length > 0;

  function handleNameDelete() {
    setStudentName("");
    setSubjectInputFocused(false);
  }

  function handleLessonDelete() {
    setSubjectName("");
    setNameInputFocused(false);
  }

  function onClickSubjectChip(e: React.MouseEvent<HTMLDivElement>) {
    setSubjectName(e.currentTarget.textContent || "");
  }

  return (
    <InputWrapper>
      <NameInputSection $nameFocused={isNameInputFocused}>
        <InputName> 학생이름 </InputName>
        <StudentInput
          type="text"
          placeholder="이름을 입력하세요"
          value={studentName}
          onChange={handleNameInputChange}
          onFocus={handleNameInputFocus}
        />
        {/* {isWarning && <WarningMessage> 이름은 최소 2자 이상 입력해주세요 </WarningMessage>} */}
        {isNameInputFocused && <RegisterLessonInputIcon onClick={handleNameDelete} />}
      </NameInputSection>

      <SubjectInputSection>
        <InputName> 과목 </InputName>
        <ChipWrapper>
          {SUBJECTS.map((subject, index) => {
            return (
              <SubjectChip onClick={(e) => onClickSubjectChip(e)} $isClicked={subjectName === subject.name} key={index}>
                {subject.name}
              </SubjectChip>
            );
          })}
        </ChipWrapper>

        {isSubjectInputFocused && <RegisterLessonInputIcon onClick={handleLessonDelete} />}
      </SubjectInputSection>
    </InputWrapper>
  );
}
const ChipWrapper = styled.div`
  gap: 1rem;
  display: flex;
  width: 30rem;
  flex-wrap: wrap;
`;

const SubjectChip = styled.div<{ $isClicked: boolean }>`
  border-radius: 0.4rem;

  ${({ theme }) => theme.fonts.body03};
  color: ${({ theme, $isClicked }) => ($isClicked ? theme.colors.green1 : theme.colors.grey300)};
  padding: 0.6rem 1.5rem;
  background-color: ${({ theme, $isClicked }) => ($isClicked ? theme.colors.green5 : theme.colors.grey50)};
  width: fit-content;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;
`;

const NameInputSection = styled.section<NameInputSectionProp>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 29.2rem;
  height: 5.6rem;
  margin-bottom: 1.3rem;

  border-bottom: 1px solid ${({ theme, $nameFocused }) => ($nameFocused ? theme.colors.green5 : theme.colors.grey70)};
`;

const SubjectInputSection = styled.section`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 29.2rem;
  height: 5.6rem;
  margin-top: "1.3rem";
`;

const InputName = styled.h1`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey300};
`;

const StudentInput = styled.input`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey700};
  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const SubjectInput = styled.input`
  display: flex;

  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.title03};
  color: ${({ theme }) => theme.colors.grey700};
  &textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const WarningMessage = styled.h3`
  ${({ theme }) => theme.fonts.body06};
  color: ${({ theme }) => theme.colors.sementic_red};
`;

const RegisterLessonInputIcon = styled(RegisterLessonInputIc)`
  position: absolute;
  bottom: 0.7rem;
  right: 1.1rem;
`;
