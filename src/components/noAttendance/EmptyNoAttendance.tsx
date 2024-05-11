import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DoneAttendanceIc, GotoHomeButton } from "../../assets";
export default function EmptyNoAttendance() {
  const navigate = useNavigate();
  function handleGotoHome() {
    navigate(-1);
  }
  return (
    <Wrapper>
      <DoneAttendance />
      <GotoHomeButtonIc onClick={handleGotoHome} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 24.1rem;
  margin-top: 8.4rem;
  gap: 4.7rem;
`;

const GotoHomeButtonIc = styled(GotoHomeButton)`
  width: 29.2rem;
  height: 5rem;
  cursor: pointer;
`;

const DoneAttendance = styled(DoneAttendanceIc)`
  width: 15.5rem;
  height: 14.4rem;
`;
