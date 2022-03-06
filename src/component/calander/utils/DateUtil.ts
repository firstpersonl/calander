import moment from 'moment';


export const shortFormat = 'YYYY-MM-DD';
export const fullFormat = 'YYYY-MM-DD HH:mm:ss';
export const monthFormat = 'YYYY-MM';


export const dateFormat = (moment: moment.Moment, format: string): string => {
    return moment.format(format);
}

/**
 * 获取当月第一天在星期排序列表中的位子。
 * momentJS 默认的星期排序为：周日 -> 周六
 * @param month month
 * @param year year
 * @returns first day of week order index
 */
export const getFirstDayOfWeek = (month: number, year: number): number => {
    return moment(`${month}-${year}`, 'MM-YYYY').startOf('month').weekday();
}

export const getDaysOfMonth = (month: number, year: number): number => {
    return moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
}

export const getMonthYear = (date: Date) => {
    const momentTime = moment(date);
    return [momentTime.month() + 1, momentTime.year()];
}

export class DaysOfTheMonth {
    public currentMonth: boolean;
    public formatValue: string;
    public date: Date;

    public format = 'YYYY-MM-DD';

    constructor(currentMonth: boolean, date: moment.Moment) {
        this.currentMonth = currentMonth;
        this.date = date.toDate();
        this.formatValue = moment(date).format(this.format);
    }
}

interface MonthYearPrat {
    month: number;
    year: number;
}

const getPreMonthYear = (month: number, year: number): MonthYearPrat => {
    if (month === 1) {
        return {
            month: 12,
            year: year - 1
        }
    }

    return { month: month - 1, year }
}

export const getPreMonth = (moment: moment.Moment): MonthYearPrat => {
    return getPreMonthYear(moment.month() + 1, moment.year());
}

export const getNextMonth = (moment: moment.Moment): MonthYearPrat => {
    return getNextMonthYear(moment.month() + 1, moment.year());
}

const getNextMonthYear = (month: number, year: number): MonthYearPrat => {
    if (month === 12) {
        return { month: 1, year: year + 1 }
    }

    return { month: month+1, year }
}

export const getDayDisplayOfMonth = (month: number, year: number): DaysOfTheMonth[] => {

    // part one get previous month days
    const dayDisplay: DaysOfTheMonth[] = [];
    const firstDayOfWeek = getFirstDayOfWeek(month, year);
    const preMonthYear = getPreMonthYear(month, year);

    const preMonthDays = getDaysOfMonth(preMonthYear.month, preMonthYear.year);

    for (let i = firstDayOfWeek - 1; i >= 0; i-=1) {
        const momentTime = moment(`${preMonthYear.month}-${preMonthDays-i}-${preMonthYear.year}`, 'MM-DD-YYYY');
        dayDisplay.push(new DaysOfTheMonth(false, momentTime));
    }

    const monthDays = getDaysOfMonth(month, year);
    for (let i = 1; i <= monthDays; i++) {
        const momentTime = moment(`${month}-${i}-${year}`, 'MM-DD-YYYY');
        dayDisplay.push(new DaysOfTheMonth(true, momentTime))
    }

    if (dayDisplay.length < 42) {
        const nextMonthYearPart = getNextMonthYear(month, year);
        const nextDayNum = 42 - dayDisplay.length;
        for (let i = 1; i<= nextDayNum; i++) {
            const momentTime = moment(`${nextMonthYearPart.month}-${i}-${nextMonthYearPart.year}`, 'MM-DD-YYYY');
            dayDisplay.push(new DaysOfTheMonth(false, momentTime));
        }
    }

    if (dayDisplay.length !== 42) {
        throw new Error("get days display array error");
    }

    return dayDisplay;

}

export const isEquals = (target: Date, other: Date): boolean => {
    return moment(target).format('YYYY-MM-DD') === moment(other).format('YYYY-MM-DD');
}