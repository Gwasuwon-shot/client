import { styled } from "styled-components";

interface SubjectLabelProps {
  subject: string;
  backgroundColor: string;
  color: string;
}

export default function sSubjectLabel(props: SubjectLabelProps) {
  const { subject, backgroundColor, color } = props;

  return (
    <SubjectBox $backgroundColor={backgroundColor} $color={color}>
      {subject}
    </SubjectBox>
  );
}

const SubjectBox = styled.span<{ $backgroundColor: string; $color: string }>`
  padding: 0.2rem 0.6rem;

  ${({ theme }) => theme.fonts.caption01};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $color }) => $color};

  border-radius: 0.8rem;
`;
