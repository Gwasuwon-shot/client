import { styled } from "styled-components";

import DatePicker from "../components/RegularLesson/TimePicker/DatePicker";
import DetailTimePicker from "../components/RegularLesson/TimePicker/DetailTimePicker";
import TimePicker from "../components/RegularLesson/TimePicker/TimePicker";

export default function TimePickerPage() {
  return (
    <PickerPage>
      <DatePicker />
      <TimePicker />
      <DetailTimePicker />
    </PickerPage>
  );
}

const PickerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
