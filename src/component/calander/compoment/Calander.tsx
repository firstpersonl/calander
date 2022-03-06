import React, {FC, useState} from 'react';
import CalanderDayIndicator from './CalanderDayIndicator';

import '../style/Calander.scss';
import CalenderMonthIndicator from './CalanderMonthIndicator';

interface CalandarProps {
    selectCallback?: (date: Date) => void;
    date?: Date;
}

const Calandar: FC<CalandarProps> = (props) => {

    const [selectDate, setSelectDate] = useState(props.date || new Date());

    return (
        <div className="calander-container">
            <CalenderMonthIndicator selectDate={selectDate} setSelectDate={setSelectDate} />
            <CalanderDayIndicator selectDate={selectDate} setSelectDate={setSelectDate} />
        </div>
    );
}

export default Calandar;