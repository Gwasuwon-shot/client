import React from 'react';
import {RegularLessonGroupIc} from "../../assets";
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';

interface selectedProps {
    dayofweek : string;
    startTime : string;
    endTime : string;
}

export default function SelectedDayAndTime(props : selectedProps) {

    const { dayofweek, startTime, endTime } = props;

    return (
        <SelectedWrapper>
            <RegularLessonGroupIcon />
            <DayWrapper> {dayofweek} </DayWrapper>
            <TimeWrapper> 
                {Number(startTime.slice(0, 2)) <= 12 ? (
                    <> 오전 {Number(startTime.slice(0, 2))}시 {startTime.slice(3)}분 </>
                    ) : (
                    <> 오후 {Number(startTime.slice(0, 2)) - 12}시 {startTime.slice(3)}분 </>
                )}  - 
                {Number(endTime.slice(0, 2)) <= 12 ? (
                    <> 오전 {Number(endTime.slice(0, 2))}시 {endTime.slice(3)}분 </>
                    ) : (
                    <> 오후 {Number(endTime.slice(0, 2)) - 12}시 {endTime.slice(3)}분 </>
                )}
            </TimeWrapper>
        </SelectedWrapper>
    );
}

const SelectedWrapper = styled.article`
    display: flex;
    align-items: center;

    width: 29.2rem;
    height: 3.6rem;
    padding: 1rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 0.4rem;

    border-radius: 7px;
    background-color: ${({ theme }) => theme.colors.green1}; 
    color: ${({ theme }) => theme.colors.green5}; 
`

const RegularLessonGroupIcon = styled(RegularLessonGroupIc)`
    width: 1.8rem;
    height: 1.8rem;
`

const DayWrapper = styled.div`
    display: flex;
    margin-left: 1.8rem;
    width: 8rem;
    ${({ theme }) => theme.fonts.body03}; 
    color: ${({ theme }) => theme.colors.green5}; 
`

const TimeWrapper = styled.div`
    display: flex;
    justfiy-content: flex-end;
    ${({ theme }) => theme.fonts.body04}; 
    color: ${({ theme }) => theme.colors.green5}; 
`