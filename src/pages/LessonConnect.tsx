import { useState } from "react";
import LessonConnectNumber from "../components/LessonConnect.tsx/LessonConnectNumber";
import LessonShare from "./LessonShare";

export default function LessonConnect() {
  const [isDone, setIsDone] = useState(true);

  function handlePassStep() {
    setIsDone(!isDone);
  }
  return <div>{isDone ? <LessonConnectNumber handlePassStep={handlePassStep} /> : <LessonShare />}</div>;
}
