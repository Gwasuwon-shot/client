import { styled } from "styled-components";
import { AttenceCheckCommonIc } from "../../assets";

interface AttendanceCheckButtonType {
  onClick: () => void;
}

export default function AttendanceCheckButton(props: AttendanceCheckButtonType) {
  const { onClick } = props;

  return (
    <AttendanceCheckButtonBox type="button" onClick={onClick}>
      <AttenceCheckCommonIc />
      <h1>출결 체크</h1>
    </AttendanceCheckButtonBox>
  );
}

const AttendanceCheckButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.6rem 1.2rem 0.6rem 0.6rem;

  border: 1px solid ${({ theme }) => theme.colors.green3};
  background-color: ${({ theme }) => theme.colors.green9};
  color: ${({ theme }) => theme.colors.grey0};
  border-radius: 1rem;

  ${({ theme }) => theme.fonts.body03}
`;
