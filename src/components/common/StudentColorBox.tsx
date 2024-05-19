import { styled } from "styled-components";
interface StudentColorBoxProp {
  backgroundColor: string;
}

export default function StudentColorBox(props: StudentColorBoxProp) {
  const { backgroundColor } = props;

  return <ColorBox $backgroundColor={backgroundColor} />;
}

const ColorBox = styled.label<{ $backgroundColor: string }>`
  display: flex;

  width: 1.3rem;
  height: 3.6rem;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 0.2rem;
`;
