import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AddLessonButtonIc } from "../../assets";

export default function CreateTreeCode() {
  const navigate = useNavigate();
  function handleMakeTreeCode() {
    navigate("/register-lesson");
  }

  return <AddLessonButtonIcon onClick={handleMakeTreeCode} />;
}

const AddLessonButtonIcon = styled(AddLessonButtonIc)`
  margin-top: 1rem;
  width: 29.2rem;
`;
