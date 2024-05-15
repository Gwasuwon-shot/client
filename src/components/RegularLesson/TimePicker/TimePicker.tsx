import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { cycleNumberState, openTimePickerState } from "../../../atom/timePicker/timePicker";

import { useRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore from "swiper";

export default function TimePicker() {
  // [{'월':['12:00', '13:00']}, ]

  // 1. 회차 상태관리
  const [activeSlide, setActiveSlide] = useRecoilState(cycleNumberState);

  function handleSlideChange(swiper: SwiperCore) {
    setActiveSlide(Number(swiper.realIndex + 1));
  }

  // 1) 회차 타임피커 모달 오픈여부 상태관리
  const [isTimePickerOpen, setIsTimePickerOpen] = useRecoilState<boolean>(openTimePickerState);

  // 2) 회차 타임피커 취소 시
  function handleCanCelTimePicker() {
    setIsTimePickerOpen(false);
    setActiveSlide(0); // 선택이 안된 상태로 변경
  }

  // 3) 회차 타임피커 완료 시

  function handleConfirmTimePicker() {
    setIsTimePickerOpen(false);
  }

  const slides = Array.from({ length: 12 }, (_, index) => <SwiperSlide key={index}>{index + 1}</SwiperSlide>);

  return (
    <TimePickerWrapper>
      <CancelWrapper>
        <CancelButton onClick={handleCanCelTimePicker}> 취소 </CancelButton>
      </CancelWrapper>

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
        onSlideChange={handleSlideChange}>
        {slides}
      </StyledSwiper>
      <Vizor />

      <ConfirmWrapper>
        <ConfirmButton onClick={handleConfirmTimePicker}> 확인 </ConfirmButton>
      </ConfirmWrapper>
    </TimePickerWrapper>
  );
}

const TimePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  /* width: 33rem; */
  width: 100%;
  height: 20rem;

  background-color: ${({ theme }) => theme.colors.grey20};
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
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

const CancelWrapper = styled.div`
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

  width: 8rem;
  height: 2rem;

  transform: translate(-50%, -50%);
  z-index: 100;
  opacity: 0.2;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: 20px;
`;
