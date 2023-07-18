import React, { useEffect } from 'react';
import {RegularLessonCalenderIc, RegularLessonClockIc} from '../../assets';
import {dayState, focusDayState, openFinishDetailState, openStartDetailState} from "../../atom/timePicker/timePicker";

import DetailTimePicker from './TimePicker/DetailTimePicker';
import RoundBottomButton from '../common/RoundBottomButton';
import SelectedDayAndTime from './SelectedDayAndTime';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

interface DayProp {
    isSelected: boolean;
};

export default function LessonDate() {
    
    // 1. 요일 관리

    const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
    const messages = "수업일시 추가";
    
    const [selectedDays, setSelectedDays] = useRecoilState(dayState);
    const [focusDay, setFocusDay] = useRecoilState(focusDayState);
    
    function handleDayButton(day: string) {
        
        if (focusDay.dayOfWeek === day) {
            setFocusDay({dayOfWeek: '', startTime: '', endTime: ''});
        } else {
            setFocusDay({dayOfWeek: day, startTime: '', endTime: ''});
        }
         
        // let dayIndex;
        // if (selectedDays.length >= 1) {
        //     dayIndex = selectedDays.findIndex((selectedDay) => selectedDay.dayOfWeek === day);
        // } else {
        //     dayIndex = -1;
        // }
        
        // if (dayIndex !== -1) {
        //     setSelectedDays((prevSelectedDays) =>
        //         prevSelectedDays.filter((selectedDay) => selectedDay.dayOfWeek !== day)
        //     );
        // } else {
        //     // 만약 시작, 종료시간을 선택하지 않은 요일이 있다면 선택하도록 강제
        //     // const isTimeNotSelected = (focusDay.dayOfWeek !== "") && (focusDay.startTime === "" || focusDay.endTime === "");
            
        //     // if (isTimeNotSelected) {
        //     //     return; 
        //     // }
            
        //     setFocusDay({dayOfWeek: day, startTime: '', endTime: ''});
        // }
    }

      
    // check 용
    useEffect(() => {
        console.log(selectedDays);
        console.log(focusDay)
    }, [selectedDays, focusDay]);
    
    
    // 2. 요일 시작, 종료시간 관리

    const [isStartPickerOpen, setIsStartPickerOpen] = useRecoilState<boolean>(openStartDetailState);

    function handlStartTimePicker () {
        setIsStartPickerOpen(true);
    }
    
    const [isFinishPickerOpen, setIsFinishPickerOpen] = useRecoilState<boolean>(openFinishDetailState);

    function handleFinishTimePicker () {
        setIsFinishPickerOpen(true);
    }


    // 수업일시 추가하기 

    function AddLesson() {
        // 만약 시작, 종료시간을 선택하지 않은 요일이 있다면 선택하도록 강제
        const isTimeNotSelected = (focusDay.dayOfWeek !== "") && (focusDay.startTime === "" || focusDay.endTime === "");
        const isDayNotSelected = (focusDay.dayOfWeek == "");
        if (isDayNotSelected || isTimeNotSelected) {
            return; 
        }
        
        // 현재 focusDay의 값을 selectedDays에 추가
        setSelectedDays((prevSelectedDays) => [...prevSelectedDays, focusDay]);
        // 현재 focusDay의 값을 빈 값으로 초기화
        setFocusDay({
            dayOfWeek: '',
            startTime: '',
            endTime: '',
        });
    }

    
    return (
        <LessonDateWrapper>

            <IconWrapper>
                <RegularLessonClockIcon />
                <SectionName> 수업일시 </SectionName>
                <Explain> 수업종료 5분 뒤에 출결알람을 드릴게요. </Explain>
            </IconWrapper>

            <DayWrapper>
                {DAYS.map((day, index) => (
                <Day key={index} 
                onClick= {()=> handleDayButton(day)} 
                disabled = {selectedDays.length >= 1 && selectedDays.findIndex((selectedDay)=> selectedDay.dayOfWeek === day) !== -1}
                isSelected={(focusDay.dayOfWeek === day)}>{day}</Day>
                ))}

            </DayWrapper>

            <TimeWrapper>
                <TimeChoose> 시작 </TimeChoose>
                {focusDay.startTime === "" ? (
                    <TimeButton onClick={handlStartTimePicker} selected={false}>시간을 선택하세요</TimeButton>
                    ) : (
                    <TimeButton onClick={handlStartTimePicker} selected={focusDay.startTime !== ""}>
                        {Number(focusDay.startTime.slice(0, 2)) <= 12 ? (
                        <>
                            오전 {Number(focusDay.startTime.slice(0, 2))}시 {focusDay.startTime.slice(3)}분
                        </>
                        ) : (
                        <>
                            오후 {Number(focusDay.startTime.slice(0, 2)) - 12}시 {focusDay.startTime.slice(3)}분
                        </>
                        )}
                    </TimeButton>
                )}
                <TimeChoose> 종료 </TimeChoose>
                {focusDay.endTime === "" ? (
                    <TimeButton onClick={handleFinishTimePicker} selected={false}>시간을 선택하세요</TimeButton>
                    ) : (
                    <TimeButton onClick={handleFinishTimePicker} selected={focusDay.endTime !== ""}>
                        {Number(focusDay.endTime.slice(0, 2)) <= 12 ? (
                        <>
                            오전 {Number(focusDay.endTime.slice(0, 2))}시 {focusDay.endTime.slice(3)}분
                        </>
                        ) : (
                        <>
                            오후 {Number(focusDay.endTime.slice(0, 2)) - 12}시 {focusDay.endTime.slice(3)}분
                        </>
                        )}
                    </TimeButton>
                )}
            </TimeWrapper>

            <ButtonWrapper onClick = {AddLesson}>
                <RoundBottomButton buttonMessage = {messages} />
            </ButtonWrapper>

            <ModalWrapper>
                <RegularLessonCalenderIcon />
                <ModalButton> 캘린더로 일정 확인하기 </ModalButton>
            </ModalWrapper>
            
            {selectedDays.map((day, index) => (
                <SelectedDayAndTime key = {index} dayofweek = {day.dayOfWeek} startTime = {day.startTime} endTime = {day.endTime} /> 
            ))}

        </LessonDateWrapper>
    );
}

const LessonDateWrapper = styled.section`
`

const IconWrapper = styled.div`
    display: flex;
    
    height: 3.1rem;
`

const RegularLessonClockIcon = styled(RegularLessonClockIc)`
    margin-left: 1.7rem;
    margin-top: 1.5rem;
`

const SectionName = styled.h1`
    margin-left: 0.8rem;
    margin-top: 1.5rem;
    
    ${({ theme }) => theme.fonts.body04};
    color: ${({ theme }) => theme.colors.grey600};
`

const Explain = styled.h3`
    margin-top: 1.7rem;
    margin-left: 1.8rem;

    ${({ theme }) => theme.fonts.caption01};
    color: ${({ theme }) => theme.colors.grey300};  
`

const DayWrapper = styled.section`
    display: flex;
    justify-content: center;
    gap: 0.2rem;

    padding-top: 1.2rem;
`

const Day = styled.button<DayProp>`
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;

    ${({ theme }) => theme.fonts.body02};
    color: ${({ theme }) => theme.colors.grey300};  
    background-color: ${({ theme }) => theme.colors.grey50}; 
    ${({ isSelected, theme }) => isSelected && `background-color: ${theme.colors.green4}`};
    ${({ isSelected, theme }) => isSelected && `color: ${theme.colors.white}`};
    ${({ disabled, theme }) => disabled && `background-color: ${theme.colors.grey400}`};
    ${({ disabled, theme }) => disabled && `color: ${theme.colors.white}`};
`

const TimeWrapper = styled.section`
    display: flex;
    justify-content: space-between;

    margin-top: 1.6rem;
    padding-left: 2rem;
    padding-right: 2rem;
`

const TimeChoose = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.3rem;

    ${({ theme }) => theme.fonts.body04};
    color: ${({ theme }) => theme.colors.grey400};  
`

const TimeButton = styled.button<{ selected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    ${({ theme }) => theme.fonts.body04};
    color: ${({ theme }) => theme.colors.grey100};  
    ${({ selected, theme }) => selected && `color: ${theme.colors.grey700};`}
`

const ButtonWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    margin : 1.6rem 0.8rem 0 0.8rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey50};
`

const ModalWrapper = styled.section`
    display: flex;
    padding-top: 0.8rem;
    margin-bottom: 1rem;
`

const RegularLessonCalenderIcon = styled(RegularLessonCalenderIc)`
    margin-left: 1.3rem;
`

const ModalButton = styled.button`
    margin-left: 0.3rem;

    text-decoration: underline;
    ${({ theme }) => theme.fonts.body04};
    color: ${({ theme }) => theme.colors.grey400};  
`