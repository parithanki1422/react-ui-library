import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function CustomDateTimePicker({ label = "Select Date & Time", onChange }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState("AM");

    const calendarRef = useRef(null);
    const inputRef = useRef(null);
    const today = new Date();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setShowPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const isToday = (day) => day.toDateString() === today.toDateString();
    const isPast = (day) => day < new Date(today.toDateString());

    const handleDateClick = (day) => {
        const newDate = new Date(day);
        let hour = selectedHour;
        if (selectedPeriod === "PM" && hour < 12) hour += 12;
        if (selectedPeriod === "AM" && hour === 12) hour = 0;
        newDate.setHours(hour);
        newDate.setMinutes(selectedMinute);
        setSelectedDate(newDate);
        if (onChange) onChange(newDate);
    };

    const handleHourClick = (hour) => {
        const newDate = selectedDate ? new Date(selectedDate) : new Date();
        if (selectedPeriod === "PM" && hour < 12) hour += 12;
        if (selectedPeriod === "AM" && hour === 12) hour = 0;
        newDate.setHours(hour);
        setSelectedHour(hour % 12 === 0 ? 12 : hour % 12);
        setSelectedDate(newDate);
        if (onChange) onChange(newDate);
    };

    const handleMinuteClick = (minute) => {
        const newDate = selectedDate ? new Date(selectedDate) : new Date();
        newDate.setMinutes(minute);
        setSelectedMinute(minute);
        setSelectedDate(newDate);
        if (onChange) onChange(newDate);
    };

    const handlePeriodClick = (period) => {
        const newDate = selectedDate ? new Date(selectedDate) : new Date();
        let hour = selectedHour;
        if (period === "PM" && hour < 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
        newDate.setHours(hour);
        setSelectedPeriod(period);
        setSelectedDate(newDate);
        if (onChange) onChange(newDate);
    };

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
    const days = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    const displayValue = selectedDate
        ? `${selectedDate.toISOString().split("T")[0]} ${String(selectedDate.getHours() % 12 || 12).padStart(2, "0")}:${String(selectedDate.getMinutes()).padStart(2, "0")} ${selectedDate.getHours() >= 12 ? "PM" : "AM"}`
        : "";

    return (
        <div className="relative w-full max-w-md" ref={calendarRef}>
            {label && <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{label}</label>}

            <input
                type="text"
                readOnly
                placeholder="YYYY-MM-DD HH:mm"
                value={displayValue}
                className="w-full px-3 py-2 border rounded-lg shadow-sm 
            bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
            border-gray-300 dark:border-gray-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onClick={() => setShowPicker(!showPicker)}
                ref={inputRef}
            />
            <FontAwesomeIcon
                icon={faCalendarAlt}
                className="absolute right-3 top-[65%] -translate-y-1/2 text-gray-400 dark:text-gray-300"
                onClick={() => setShowPicker(!showPicker)}
            />

            {showPicker && (
                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-20 p-5 flex gap-6 w-[565px]">
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-1 hover:bg-gray-100 dark:bg-gray-400 rounded"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span className="font-medium">
                                {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
                            </span>
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-1 hover:bg-gray-100 dark:bg-gray-400 rounded"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 text-xs text-gray-500 mb-2 gap-6">
                            {daysOfWeek.map(d => <div key={d} className="text-center font-medium">{d}</div>)}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {Array(days[0].getDay()).fill(null).map((_, i) => <div key={i} />)}
                            {days.map(day => {
                                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                                return (
                                    <button
                                        key={day.toISOString()}
                                        disabled={isPast(day)}
                                        onClick={() => handleDateClick(day)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition
                      ${isSelected ? "bg-blue-600 text-white" : ""}
                      ${isToday(day) && !isSelected ? "border border-blue-400" : ""}
                      ${!isPast(day) ? "hover:bg-blue-100 dark:hover:bg-gray-700" : "opacity-40 cursor-not-allowed"}
                    `}
                                    >
                                        {day.getDate()}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3 w-64">
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium mb-1">Hour</span>
                            <div className="flex flex-col max-h-80 overflow-y-auto gap-1 pr-1">
                                {hours.map(h => (
                                    <button
                                        key={h}
                                        onClick={() => handleHourClick(h)}
                                        className={`px-3 py-1 rounded-md text-sm text-center transition
                      ${selectedHour === h ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}
                      hover:bg-blue-200 dark:hover:bg-blue-600
                    `}
                                    >
                                        {h}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium mb-1">Minute</span>
                            <div className="flex flex-col max-h-80 overflow-y-auto gap-1 pr-1">
                                {minutes.map(m => (
                                    <button
                                        key={m}
                                        onClick={() => handleMinuteClick(m)}
                                        className={`px-3 py-1 rounded-md text-sm text-center transition
                      ${selectedMinute === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}
                      hover:bg-blue-200 dark:hover:bg-blue-600
                    `}
                                    >
                                        {m.toString().padStart(2, "0")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium mb-1">AM/PM</span>
                            <div className="flex flex-col max-h-60 overflow-y-auto gap-1 pr-1">
                                {["AM", "PM"].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handlePeriodClick(p)}
                                        className={`px-3 py-1 rounded-md text-sm text-center transition
                      ${selectedPeriod === p ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}
                      hover:bg-blue-200 dark:hover:bg-blue-600
                    `}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
