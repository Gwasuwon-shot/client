import { styled } from "styled-components";
interface StudentColorBoxProp {
  backgroundColor: string;
}
export default function ManageStudentColorBox(props: StudentColorBoxProp) {
  const { backgroundColor } = props;

  return <ColorBox $backgroundColor={backgroundColor} />;
}

const ColorBox = styled.label<{ $backgroundColor: string }>`
  display: flex;

  width: 0.6rem;
  height: 1.6rem;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 0.092rem;
`;
