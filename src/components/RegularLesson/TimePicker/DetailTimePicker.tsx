import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  dayState,
  focusDayState,
  openFinishDetailState,
  openStartDetailState,
} from "../../../atom/timePicker/timePicker";

import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore from "swiper";

export default function DetailTimePicker() {
  // 1. 오전 오후 관리
  // 1) active slide 값 관리

  const [activeAmPmSlide, setActiveAmPmSlide] = useState(0);

  function handleAmPmSlideChange(swiper: SwiperCore) {
    setActiveAmPmSlide(swiper.realIndex);
  }

  // 2) swiper
  const AMPM = ["오전", "오후"];
  const slidesAmPm = Array.from({ length: 2 }, (_, index) => <SwiperSlide key={index}>{AMPM[index]}</SwiperSlide>);

  // 2. 시간 관리
  // 1) active slide 값 관리

  const [activeHourSlide, setActiveHourSlide] = useState(0);

  function handleHourSlideChange(swiper: SwiperCore) {
    setActiveHourSlide(swiper.realIndex + 1);
  }

  // 2) swiper
  const slidesHour = Array.from({ length: 12 }, (_, index) => <SwiperSlide key={index}>{index + 1}시</SwiperSlide>);

  // 3. 분 관리
  // 1) active slide 값 관리
  const MINUTES = ["00", "30"];
  const [activeMinuteSlide, setActiveMinuteSlide] = useState("00");

  function handleMinuteSlideChange(swiper: SwiperCore) {
    setActiveMinuteSlide(MINUTES[swiper.realIndex]);
  }

  // 2) swiper
  const slidesMinute = Array.from({ length: 2 }, (_, index) => <SwiperSlide key={index}>{MINUTES[index]}분</SwiperSlide>);

  // 4. 시작시간 상태관리
  const [isStartPickerOpen, setIsStartPickerOpen] = useRecoilState<boolean>(openStartDetailState);
  const [selectedDays, setSelectedDays] = useRecoilState(dayState);
  const [focusDay, setFocusDay] = useRecoilState(focusDayState);

  // 1) 시작 타임피커 완료시
  function handleConfirmStartTimePicker() {
    const formattedHour =
      activeHourSlide === 12 && activeAmPmSlide === 0 ? "00" : String(activeHourSlide).padStart(2, "0");

    const newStartTime =
      activeAmPmSlide === 0
        ? `${formattedHour}:${activeMinuteSlide}`
        : activeHourSlide === 12
        ? `12:${activeMinuteSlide}`
        : `${activeHourSlide + 12}`;
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.map((day) => (day.dayOfWeek === focusDay ? { ...day, startTime: newStartTime } : day)),
  );
    setFocusDay("");
    setIsStartPickerOpen(false);
  }

  // 2) 시작 타임피커 취소시
  function handleCancelStartTimePicker() {
    setIsStartPickerOpen(false);
  }

  // 5. 종료시간 상태관리
  const [isFinishPickerOpen, setIsFinishPickerOpen] = useRecoilState<boolean>(openFinishDetailState);

  // 1) 종료 타임피커 완료시
  function handleConfirmFinishTimePicker() {
    const formattedHour =
      activeHourSlide === 12 && activeAmPmSlide === 0 ? "00" : String(activeHourSlide).padStart(2, "0");
    const newEndTime =
      activeAmPmSlide === 0
        ? `${formattedHour}:${activeMinuteSlide}`
        : activeHourSlide === 12
        ? `12:${activeMinuteSlide}`
        : `${activeHourSlide + 12}:${activeMinuteSlide}`;
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.map((day) => (day.dayOfWeek === focusDay ? { ...day, endTime: newEndTime } : day)),
    );
    
    setFocusDay("");
    setIsFinishPickerOpen(false);
  }

  // 2) 종료 타임피커 취소시
  function handleCancelFinishTimePicker() {
    setIsFinishPickerOpen(false);
  }

  return (
    <TimePickerWrapper>
      <CancleWrapper>
        {isStartPickerOpen ? (
          <CancelButton onClick={handleCancelStartTimePicker}>취소</CancelButton>
        ) : (
          <CancelButton onClick={handleCancelFinishTimePicker}>취소</CancelButton>
        )}
      </CancleWrapper>

      <SwiperWrapper>
        <StyledSwiper
          direction="vertical"
          slidesPerView={5}
          spaceBetween={20}
          freeMode={true}
          freeModeSticky={true}
          freeModeMomentumRatio={0.25}
          freeModeMinimumVelocity={0.1}
          slideToClickedSlide={true}
          centeredSlides={true}
          onSlideChange={handleAmPmSlideChange}>
          {slidesAmPm}
        </StyledSwiper>

        <StyledSwiper
          direction="vertical"
          slidesPerView={5}
          spaceBetween={20}
          freeMode={true}
          freeModeSticky={true}
          freeModeMomentumRatio={0.25}
          freeModeMinimumVelocity={0.1}
          loop={true}
          loopAdditionalSlides={5}
          slideToClickedSlide={true}
          centeredSlides={true}
          onSlideChange={handleHourSlideChange}>
          {slidesHour}
        </StyledSwiper>

        <StyledSwiper
          direction="vertical"
          slidesPerView={5}
          spaceBetween={20}
          freeMode={true}
          freeModeSticky={true}
          freeModeMomentumRatio={0.25}
          freeModeMinimumVelocity={0.1}
          slideToClickedSlide={true}
          centeredSlides={true}
          onSlideChange={handleMinuteSlideChange}>
          {slidesMinute}
        </StyledSwiper>
        <Vizor />
      </SwiperWrapper>

      <ConfirmWrapper>
        {isStartPickerOpen ? (
          <ConfirmButton onClick={handleConfirmStartTimePicker}>확인</ConfirmButton>
        ) : (
          <ConfirmButton onClick={handleConfirmFinishTimePicker}>확인</ConfirmButton>
        )}
      </ConfirmWrapper>
    </TimePickerWrapper>
  );
}

const TimePickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: 32rem;
  height: 20rem;

  background-color: ${({ theme }) => theme.colors.grey20};
`;

const SwiperWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 13rem;
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.5rem;
  height: 14rem;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey400};
  background-color: ${({ theme }) => theme.colors.grey20};

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    opacity: 0.4;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  & .swiper-slide-active {
    opacity: 1;
    color: ${({ theme }) => theme.colors.grey700};
  }
`;

const CancleWrapper = styled.div`
  display: flex;

  position: relative;

  width: 6rem;
  height: 100%;
`;

const ConfirmWrapper = styled.div`
  display: flex;

  position: relative;

  width: 6rem;
  height: 100%;
`;
const CancelButton = styled.button`
  position: absolute;
  top: 0.7rem;
  left: 1rem;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey400};
`;

const ConfirmButton = styled.button`
  position: absolute;
  top: 0.7rem;
  right: 1rem;

  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.green5};
`;

const Vizor = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 15rem;
  height: 2rem;

  transform: translate(-50%, -50%);
  z-index: 100;
  opacity: 0.2;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: 20px;
`;
