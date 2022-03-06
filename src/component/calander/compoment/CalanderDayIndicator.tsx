import moment from 'moment';
import React, { FC, MouseEvent } from 'react';
import { getDayDisplayOfMonth, getMonthYear, isEquals } from '../utils/DateUtil';
import CalanderWeekIndicator from './CalanderWeekIndicator';

interface DayIndicatorProps {
    selectDate: Date,
    setSelectDate: (date: Date) => void

}

const CalanderDayIndicator: FC<DayIndicatorProps> = ({ selectDate, setSelectDate }) => {

    // const momentTime = moment(date);
    const [month, year] = getMonthYear(selectDate);
    const dayDisplay = getDayDisplayOfMonth(month, year);

    const onClickDate = (event: MouseEvent<HTMLDivElement>) => {
        const momentTime = moment(event.currentTarget.getAttribute('data-date'),
            event.currentTarget.getAttribute('data-format')!);
        console.log(event)
        setSelectDate(momentTime.toDate());
    }

    return (
        <>
            <CalanderWeekIndicator />
            <div className="day-indicator">
                {dayDisplay.map(day => {
                    return <div className={`day-icon${isEquals(day.date, selectDate) ? ' selected' : ''}${day.currentMonth ? '' : ' other-month-day'}`}
                        key={day.formatValue}
                        data-date={day.formatValue}
                        date-format={day.format}
                        onClick={onClickDate}>{day.date.getDate()}</div>
                })}
            </div>
        </>

    );
}


export default CalanderDayIndicator;