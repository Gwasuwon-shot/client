import { styled } from "styled-components";

import Footer from "../components/RegularLesson/Footer";
import Header from "../components/RegularLesson/Header";
import LessonDate from "../components/RegularLesson/LessonDate";

export default function RegularLesson() {
  return (
    <RegularWrapper>
      <Header />
      <LessonDate />
      <Footer />
    </RegularWrapper>
  );
}

const RegularWrapper = styled.main`
  /* overflow-y: scroll; */
`;
