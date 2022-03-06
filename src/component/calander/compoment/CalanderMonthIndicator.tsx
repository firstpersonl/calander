import moment from 'moment';
import React, { FC } from 'react';
import { dateFormat, getNextMonth, getPreMonth, monthFormat } from '../utils/DateUtil';

import '../style/MonthIndicator.scss';

interface MonthIndicatorProps {
    selectDate: Date,
    setSelectDate: (date: Date) => void
}

const MonthIndicator: FC<MonthIndicatorProps> = ({ selectDate, setSelectDate}) => {
    const momentTime = moment(selectDate);


    const changeMonth = (date: {month: number, year: number}) => {
        setSelectDate(moment(`${date.month}-${date.year}`,'MM-YYYY').toDate());
    }

    return (
        <div className="month-indicator">
            <div className="month-arrow" onClick={()=>changeMonth(getPreMonth(momentTime))}>&lt;</div>
            <div><h3>{dateFormat(momentTime, monthFormat)}</h3></div>
            <div className="month-arrow" onClick={()=>changeMonth(getNextMonth(momentTime))}>&gt;</div>
        </div>
    );
}

export default MonthIndicator;
