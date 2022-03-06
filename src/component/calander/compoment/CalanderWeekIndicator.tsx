import moment from 'moment';
import React, { FC } from 'react';


const CalanderWeekIndicator: FC<{}> = (props) => {

    const weekList = moment.weekdaysShort().map((week) => <div className="week-icon" key={week}>{week}</div>);
    return (
        <div className="week-indicator">
            {weekList}
        </div>
    )
}

export default CalanderWeekIndicator;