import React, { useState, useEffect } from 'react';
import {getInstanceAxios} from "../../utils/helper";
import {useNavigate} from "react-router-dom";
import {BsChevronDoubleLeft, BsChevronDoubleRight} from "react-icons/bs";

const Calendar = () => {

    const navigate = useNavigate();

    const [monthTrainingData, setMonthTrainingData] = useState([]);
    const [today, setToday] = useState(new Date());

    const [yearForRequest, setYearForRequest] = useState(new Date().getFullYear());
    const [monthForRequest, setMonthForRequest] = useState(new Date().getMonth() + 1);

    const [days, setDays] = useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    const [months, setMonths] = useState([
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ]);
    // const [weekDays, setWeekDays] = useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const [weekDays, setWeekDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

    const [lastMonth, setLastMonth] = useState(11);
    const [month, setMonth] = useState(0);
    const [nextMonth, setNextMonth] = useState(1);
    const [year, setYear] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(0);
    const [calendar, setCalendar] = useState([
        { id: 'week-1', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-2', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-3', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-4', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-5', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-6', data: [0, 0, 0, 0, 0, 0, 0] },
    ]);

    const setMonthData = (date) => {
        const newMonth = date.getMonth();
        const newLastMonth = newMonth === 0 ? 11 : newMonth - 1;
        const newNextMonth = newMonth === 11 ? 0 : newMonth + 1;

        setLastMonth(newLastMonth);
        setMonth(newMonth);
        setNextMonth(newNextMonth);

        return { lastMonth: newLastMonth, month: newMonth, nextMonth: newNextMonth };
    };

    const setCalendarData = (date) => {
        const { lastMonth, month, nextMonth } = setMonthData(date);
        const newYear = date.getFullYear();
        const firstDayOfMonth = new Date(newYear, month, 1).getDay();
        const monthDays = checkLeapYear(newYear);

        const calendarData = [];
        let weekData = { id: 'week-1', data: [] };

        // Добавляем пустые ячейки для предыдущего месяца
        let prevMonthDays = monthDays[lastMonth === 0 ? 11 : lastMonth - 1];
        for (let i = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; i > 0; i--) {
            const day = prevMonthDays - (i - 1);
            weekData.data.push({
                value: day,
                class: 'day--soft day',
                month: lastMonth === 0 ? 11 : lastMonth - 1,
            });
        }

        let dayCount = 1;
        let currentMonthDays = monthDays[month];

        // Добавляем ячейки для текущего месяца
        while (dayCount <= currentMonthDays) {
            const isToday = dayCount === today.getDate() && month === today.getMonth() && newYear === today.getFullYear();
            weekData.data.push({
                value: dayCount,
                class: isToday ? 'day today' : 'day',
                month: month,
            });

            if (weekData.data.length === 7) {
                calendarData.push(weekData);
                weekData = { id: `week-${calendarData.length + 1}`, data: [] };
            }

            dayCount++;
        }

        // Добавляем пустые ячейки для следующего месяца
        let nextMonthDay = 1;
        while (weekData.data.length < 7) {
            weekData.data.push({
                value: nextMonthDay,
                class: 'day--soft day',
                month: nextMonth,
            });
            nextMonthDay++;
        }


        calendarData.push(weekData);
        setMonth(month);
        setYear(newYear);
        setCalendar(calendarData);
    };

    const checkLeapYear = (year) => {
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        setDays(monthDays);
        return monthDays;
    };

    const previousCalendar = () => {
        const newMonth = month !== 0 ? month - 1 : 11;
        const newYear = month !== 0 ? year : year - 1;
        setCalendarData(new Date(newYear, newMonth, 1));

        setYearForRequest(newYear);
        setMonthForRequest(newMonth +1);

        requestMonth(newMonth +1, newYear);
        changeArrowsBtn(true);
    };

    const nextCalendar = () => {
        const newMonth = month !== 11 ? month + 1 : 0;
        const newYear = month !== 11 ? year : year + 1;
        setCalendarData(new Date(newYear, newMonth, 1));

        setYearForRequest(newYear);
        setMonthForRequest(newMonth +1);

        requestMonth(newMonth +1, newYear)
        changeArrowsBtn(true);
    };

    // Заблокировать кнопки до ответа

    const changeArrowsBtn = (action) => {
        document.getElementById('prev-month-btn').disabled = action;
        document.getElementById('next-month-btn').disabled = action;
    }

    const requestMonth = (newMonth, newYear) => {
        setYearForRequest(newYear);
        setMonthForRequest(newMonth);
        (async () => { await getMonthTraining(newYear, newMonth); })();
    }

    const getMonthTraining = async (yearForRequest, monthForRequest) => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            await getInstanceAxios("Content-Type: application/json")
                .get(backendUrl + '/api/training-month/?year='+yearForRequest+'&month='+monthForRequest).then(response => {
                    setMonthTrainingData(response.data);
                    changeArrowsBtn(false);

                }).catch(error => {
                    localStorage.removeItem('token');
                    // navigate('/login');
                    console.log(error)
                });

        } catch (error) {
            localStorage.removeItem('token');
            // navigate('/login');
        }

        // setLoader(false);
    }

    useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        setCurrentMonth(currentMonth);
        setCurrentYear(currentYear);
        setCalendarData(now);
        (async () => {
            await getMonthTraining(yearForRequest, monthForRequest);
        })();
    }, []);

    const getDayStatus = (day) => {
        if (monthTrainingData?.length) {
            return monthTrainingData.some(obj => obj.hasOwnProperty(day)) ? <span className={'active-bg circle'}/> : <span className={'rest-bg circle'} />;
        }
        return <span className={'rest-bg circle'} />;
    };

    const navigateToDay = (day) => {
        if (day.class === 'day' || day.class === 'day today') {
            const month = (day.month + 1).toString().padStart(2, '0');
            const dayDate = day.value.toString().padStart(2, '0');
            const date = `${year}-${month}-${dayDate}`;

            // Ваш код для навигации по дате
            navigate(`/week/${date}`);
        }
    };

    function generateRandomKey() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let key = '';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters[randomIndex];
        }

        return key;
    }


    return (
        <div className={'cage-bg'}>
            <div className={'spacer'}/>
            <div className={'spacer'}/>
            <h1 className={'section-header underline-red'}>Calendar</h1>

            <div className="calendar">

                <div className="calendar-header">
                    <button onClick={previousCalendar} id={'prev-month-btn'}>
                        <BsChevronDoubleLeft/>
                    </button>
                    <div className="calendar-title">
                        {months[month]} {year}
                    </div>
                    <button onClick={nextCalendar} id={'next-month-btn'}>
                        <BsChevronDoubleRight/>
                    </button>
                </div>

                <table className="calendar-table">
                    <thead>
                    <tr className={'week_days_tr'}>
                        {weekDays.map((weekday) => (
                            <th key={weekday}>{weekday}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {calendar.map((week) => (
                        <tr key={week.id}>
                            {week.data.map((day) => (
                                <td className={day.class} key={generateRandomKey()} onClick={() => navigateToDay(day)}>
                                    {day.value}
                                    <br/>
                                    {getDayStatus(day.value)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
