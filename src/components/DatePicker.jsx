import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function DatePicker({
    label = "Select Date",
    onChange,
    disablePast = false,
    disableFuture = false,
}) {
    const [selectedDate, setSelectedDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const calendarRef = useRef();
    const inputRef = useRef();

    const today = new Date();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setShowCalendar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const handleDateClick = (date) => {
        const isPast = disablePast && date < new Date(today.toDateString());
        const isFuture = disableFuture && date > new Date(today.toDateString());
        if (isPast || isFuture) return;

        const formatted = date.toLocaleDateString("en-CA");
        setSelectedDate(formatted);
        setShowCalendar(false);
        if (onChange) onChange(formatted);
    };

    const days = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    const isToday = (day) => new Date(day).toDateString() === today.toDateString();

    return (
        <div className="relative w-full max-w-xs flex flex-col" ref={calendarRef}>
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}

            <div
                className="relative w-full cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
                ref={inputRef}
            >
                <input
                    type="text"
                    value={selectedDate}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm 
            bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
            border-gray-300 dark:border-gray-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
                />
            </div>

            {showCalendar && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20 p-3 animate-fade-in">
                    <div className="flex justify-between items-center mb-2 text-gray-700 dark:text-gray-200">
                        <button
                            onClick={() =>
                                setCurrentMonth(
                                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                                )
                            }
                            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="font-medium">
                            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                            {currentMonth.getFullYear()}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentMonth(
                                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                                )
                            }
                            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 text-xs mb-1 text-gray-500 dark:text-gray-400">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="text-center">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {Array(days[0].getDay()).fill(null).map((_, i) => (
                            <div key={`empty-${i}`}></div>
                        ))}

                        {days.map((day) => {
                            const dayString = day.toLocaleDateString("en-CA");
                            const isSelected = selectedDate === dayString;
                            const todayHighlight = isToday(day);
                            const isDisabled =
                                (disablePast && day < new Date(today.toDateString())) ||
                                (disableFuture && day > new Date(today.toDateString()));

                            return (
                                <div
                                    key={day.toISOString()}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer 
                    ${isSelected ? "bg-blue-600 text-white" : ""}
                    ${todayHighlight && !isSelected ? "border border-blue-400" : ""}
                    ${!isDisabled ? "hover:bg-blue-100 dark:hover:bg-gray-800" : "opacity-40 cursor-not-allowed"}
                    text-gray-700 dark:text-gray-200
                  `}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day.getDate()}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
