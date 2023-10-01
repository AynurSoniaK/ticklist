import React, { useState, useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import {
    format,
    subMonths,
    addMonths,
    startOfWeek,
    addDays,
    isSameDay,
    lastDayOfWeek,
    getWeek,
    addWeeks,
    subWeeks,
} from "date-fns";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';

interface CalendarProps {
    showDetailsHandle: (day: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ showDetailsHandle }) => {

    const userContext = useContext(UserContext)

    const [currentMonth, setCurrentMonth] = useState<Date>(userContext.userDateSelected);
    const [currentWeek, setCurrentWeek] = useState<number>(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState<Date>(userContext.userDateSelected);

    // const changeMonthHandle = (btnType: "prev" | "next"): void => {
    //     if (btnType === "prev") {
    //         setCurrentMonth(subMonths(currentMonth, 1));
    //     }
    //     if (btnType === "next") {
    //         setCurrentMonth(addMonths(currentMonth, 1));
    //     }
    // };


    const changeWeekHandle = (btnType: "prev" | "next"): void => {
        if (btnType === "prev") {
            setCurrentMonth(subWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
        }
        if (btnType === "next") {
            setCurrentMonth(addWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
        }
    };

    const onDateClickHandle = (day: Date, dayStr: string): void => {
        setSelectedDate(day);
        userContext.setUserDateSelected(day)
        showDetailsHandle(day);
    };
    
    useEffect(() => {
        userContext.setUserDateSelected(selectedDate);
    }, [])

    const renderHeader = (): JSX.Element => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header pb row flex-middle">
                <div className="col col-left ml secondary">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>
            </div>
        );
    };

    const renderDays = (): JSX.Element => {
        const dateFormat = "EEE";
        const days: JSX.Element[] = [];
        let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };

    const renderCells = (): JSX.Element => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows: JSX.Element[] = [];
        let days: JSX.Element[] = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${isSameDay(day, selectedDate)
                            ? "selected"
                            : ""
                            }`}
                        key={day.toString()}
                        onClick={() => {
                            const dayStr = format(cloneDay, "ccc dd MMM yy");
                            onDateClickHandle(cloneDay, dayStr);
                        }}
                    >
                        <span className="number"><div className="circle">{formattedDate}</div></span>
                    </div>
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div className="row" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };

    const renderFooter = (): JSX.Element => {
        return (
            <div className="header pt row flex-middle">
                <div className="col col-start">
                    <div className="ml icon" onClick={() => changeWeekHandle("prev")}>
                        <ArrowBackIcon />
                    </div>
                </div>
                {/* <div>week {currentWeek}</div> */}
                <div className="col col-end mr icon" onClick={() => changeWeekHandle("next")}>
                    <ArrowForwardSharpIcon />
                </div>
            </div>
        );
    };

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            {renderFooter()}
        </div>
    );
};

export default Calendar;
