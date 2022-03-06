import {getDaysOfMonth, getFirstDayOfWeek} from '../DateUtil';


test('getDaysOfMonth', () => {
    const days = getDaysOfMonth(2, 2022);
    expect(days).toBe(28);
})

test('getFirstDayOfWeek', () => {
    const weekIndex = getFirstDayOfWeek(12, 2021);
    expect(weekIndex).toBe(3);
})

