import {
    cycleNumberState,
    dateState,
    dayState,
    firstLessonDay,
    focusDayState,
    temporarySchedule,
} from "../../atom/timePicker/timePicker";
import {useEffect, useState} from 'react';

import DatePicker from '../../components/RegularLesson/TimePicker/DatePicker';
import { openDatePickerState } from "../../atom/timePicker/timePicker";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';

export default function Footer() {
    
    const navigate = useNavigate();
        
    const [isDatePickerOpen, setIsDatePickerOpen] = useRecoilState<boolean>(openDatePickerState);
    const [activeDateSlide, setActiveDateSlide] = useRecoilState(dateState);
    const [firstLesson, setfirstLesson] = useRecoilState(firstLessonDay);
    const [day, setDayState] = useRecoilState(dayState);
    
    function moveToTuitionPayment() {
        if (firstLesson) {
            setDayState([{ dayOfWeek: firstLesson, startTime: "12:00", endTime: "12:00" }]);
        }
        navigate("/regular-lesson");
    }
    
    
    return (
        <FooterWrapper>
            <FooterButtonWrapper onClick = {moveToTuitionPayment}> 
                <FooterButton> 저장 </FooterButton>
            </FooterButtonWrapper>
            {isDatePickerOpen && <ModalWrapper> <DatePicker /> </ModalWrapper>}
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    display: flex;
    
    width: 32rem;
    height: 7rem;
`

const FooterButtonWrapper = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    bottom: 0;

    width: 32rem;
    height: 6.3rem;
    padding: 0.8rem;

    background-color: ${({ theme }) => theme.colors.green5};
`

const FooterButton = styled.button`
    display: flex;
    
    ${({ theme }) => theme.fonts.body02};
    color: ${({ theme }) => theme.colors.white}; 
`

const ModalWrapper = styled.div`
    display: flex;

    position: fixed;
    bottom: 0;
    
    width: 100%;
`