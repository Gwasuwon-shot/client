import { styled } from "styled-components";

interface NoCheckPageAttendanceButtonProp {
  onClick?: () => void;
}

export default function NoCheckPageAttendanceButton(props: NoCheckPageAttendanceButtonProp) {
  const { onClick } = props;

  return (
    <AttendanceCheckButtonBox type="button" onClick={onClick}>
      <h1>출결 체크</h1>
    </AttendanceCheckButtonBox>
  );
}

const AttendanceCheckButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5.8rem;
  height: 3rem;

  border: 1px solid ${({ theme }) => theme.colors.green4};
  background-color: ${({ theme }) => theme.colors.green5};
  color: ${({ theme }) => theme.colors.grey0};
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.body03};

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.green6};
    background-color: ${({ theme }) => theme.colors.green10};
  }
`;
