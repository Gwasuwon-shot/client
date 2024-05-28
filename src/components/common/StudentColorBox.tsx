import { styled } from "styled-components";
import { STUDENT_COLOR } from "../../core/common/studentColor";
interface StudentColorBoxProp {
  lessonIdx: number;
}

export default function StudentColorBox(props: StudentColorBoxProp) {
  const { lessonIdx } = props;

  return <ColorBox $backgroundColor={STUDENT_COLOR[lessonIdx % 10]} />;
}

const ColorBox = styled.label<{ $backgroundColor: string }>`
  display: flex;

  width: 1.3rem;
  height: 3.6rem;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 0.2rem;
`;
