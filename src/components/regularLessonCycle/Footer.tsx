import { useEffect, useState } from "react";

import TimePicker from "../../components/RegularLesson/TimePicker/TimePicker";
import { cycleNumberState } from "../../atom/timePicker/timePicker";
import { openTimePickerState } from "../../atom/timePicker/timePicker";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function Footer() {
  const navigate = useNavigate();

  const [isTimePickerOpen, setIsTimePickerOpen] = useRecoilState<boolean>(openTimePickerState);
  const [activeCycleSlide, setActiveCycleSlide] = useRecoilState(cycleNumberState);

  let [isSame, setIsSame] = useState(false);
  isSame = activeCycleSlide !== 0;

  function moveToRegularLessonDate() {
    if (isSame) {
      navigate("/regular-lesson-date");
    }
  }

  return (
    <FooterWrapper>
      <FooterButtonWrapper selected={isSame} onClick={moveToRegularLessonDate}>
        <FooterButton disabled={isSame}> 저장 </FooterButton>
      </FooterButtonWrapper>
      {isTimePickerOpen && (
        <ModalWrapper>
          <TimePicker />
        </ModalWrapper>
      )}
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;

  width: 32rem;
  height: 7rem;
`;

const FooterButtonWrapper = styled.footer<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;

  width: 32rem;
  height: 6.3rem;
  padding: 0.8rem;

  background-color: ${({ theme }) => theme.colors.grey50};
  ${({ selected, theme }) => selected && `background-color: ${theme.colors.green5};`}
`;

const FooterButton = styled.button<{ disabled: boolean }>`
  display: flex;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey200};
  ${({ disabled, theme }) => disabled && `color: ${theme.colors.white};`}
`;

const ModalWrapper = styled.div`
  display: flex;

  position: fixed;
  bottom: 0;

  width: 32rem;
`;
