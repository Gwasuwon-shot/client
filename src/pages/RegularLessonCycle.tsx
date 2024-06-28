import { styled } from "styled-components";

import CycleInput from "../components/regularLessonCycle/CycleInput";
import Footer from "../components/regularLessonCycle/Footer";
import Header from "../components/regularLessonCycle/Header";

export default function RegularLessonCycle() {
  return (
    <RegularWrapper>
      <Header />
      <CycleInput />
      <Footer />
    </RegularWrapper>
  );
}

const RegularWrapper = styled.main`
  /* overflow-y: scroll; 왜 있었는지 모르겠음 */
`;
