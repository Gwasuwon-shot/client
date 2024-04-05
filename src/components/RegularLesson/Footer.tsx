import { dayState, firstLessonDay, focusDayState } from "../../atom/timePicker/timePicker";
import { openDatePickerState, openFinishDetailState, openStartDetailState, openTimePickerState } from "../../atom/timePicker/timePicker";
import {useEffect, useState} from 'react';

import DatePicker from '../../components/RegularLesson/TimePicker/DatePicker';
import DetailTimePicker from '../../components/RegularLesson/TimePicker/DetailTimePicker';
import SelectedDayAndTime from './SelectedDayAndTime';
import TimePicker from '../../components/RegularLesson/TimePicker/TimePicker';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';

export default function Footer() {
    
    const navigate = useNavigate();
    
    const [isTimePickerOpen, setIsTimePickerOpen] = useRecoilState<boolean>(openTimePickerState);
    const [isDatePickerOpen, setIsDatePickerOpen] = useRecoilState<boolean>(openDatePickerState);
    const [isStartPickerOpen, setIsStartPickerOpen] = useRecoilState<boolean>(openStartDetailState);
    const [isFinishPickerOpen, setIsFinishPickerOpen] = useRecoilState<boolean>(openFinishDetailState);

    const [firstday, setFirstday] = useRecoilState(firstLessonDay);
    const [selectedDays, setSelectedDays] = useRecoilState(dayState);

    let [isSame, setIsSame] = useState(false);
    
    // 저장버튼 활성화 로직 : 수업일시 확정요일 배열과 첫 수업일이 변경될 경우, 배열을 순회하여 해당 수업일이 존재하는지 체크
    useEffect(() => {
        setIsSame(false);
        for (let idx in selectedDays) {
            if (selectedDays[idx].dayOfWeek === firstday) {
                setIsSame(true);
                break;
            }
        }
    }, [selectedDays, firstday]);

  const validateTimes = useGetValidateTimeRange(selectedDays);

    function moveToTuitionPayment() {
    if (validateTimes.every((result) => result.isSuccess) && isSame) {
            navigate("/tuition-payment");
    } else {
      showModal();
        }
    }
    
    return (
        <FooterWrapper>
            <FooterButtonWrapper selected = {isSame} onClick = {moveToTuitionPayment}> 
                <FooterButton disabled = {isSame}> 저장 </FooterButton>
            </FooterButtonWrapper>
            {isTimePickerOpen && <ModalWrapper> <TimePicker /> </ModalWrapper>}
            {isDatePickerOpen && <ModalWrapper> <DatePicker /> </ModalWrapper>}
            {(isStartPickerOpen || isFinishPickerOpen) && <ModalWrapper> <DetailTimePicker /> </ModalWrapper>}
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    display: flex;
    
    width: 32rem;
    height: 7rem;
`

const FooterButtonWrapper = styled.footer<{selected: boolean}>`
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
`

const FooterButton = styled.button<{disabled: boolean}>`
    display: flex;
    
    ${({ theme }) => theme.fonts.body02};
    color: ${({ theme }) => theme.colors.grey200}; 
    ${({ disabled, theme }) => disabled && `color: ${theme.colors.white};`}
`

const ModalWrapper = styled.div`
    display: flex;

    position: fixed;
    bottom: 0;
    
    width: 100%;
`