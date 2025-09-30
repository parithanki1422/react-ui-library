import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChevronLeft, faChevronRight, faClock } from "@fortawesome/free-solid-svg-icons";

export default function DateTimePicker({ label = "Select Date & Time", onChange }) {
    const [selectedDateTime, setSelectedDateTime] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
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

    const handleDateClick = (day) => {
        const timePart = selectedDateTime ? selectedDateTime.split("T")[1] : "12:00";
        const formatted = `${day.toLocaleDateString("en-CA")}T${timePart}`;
        setSelectedDateTime(formatted);
        if (onChange) onChange(formatted);
        setShowPicker(false);
    };

    const handleTimeChange = (e) => {
        const timeValue = e.target.value;
        const datePart = selectedDateTime
            ? selectedDateTime.split("T")[0]
            : today.toLocaleDateString("en-CA");
        const formatted = `${datePart}T${timeValue}`;
        setSelectedDateTime(formatted);
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
                onClick={() => setShowPicker(!showPicker)}
                ref={inputRef}
            >
                <input
                    type="text"
                    value={selectedDateTime.replace("T", " ")}
                    readOnly
                    placeholder="YYYY-MM-DD HH:mm"
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

            {showPicker && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20 p-3 animate-fade-in">
                    {/* Calendar Header */}
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

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 text-xs mb-1 text-gray-500 dark:text-gray-400">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="text-center">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-1 mb-3">
                        {Array(days[0].getDay())
                            .fill(null)
                            .map((_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}

                        {days.map((day) => {
                            const dayString = day.toLocaleDateString("en-CA");
                            const isSelected = selectedDateTime.startsWith(dayString);
                            const todayHighlight = isToday(day);

                            return (
                                <div
                                    key={day.toISOString()}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer 
                    ${isSelected ? "bg-blue-600 text-white" : ""}
                    ${todayHighlight && !isSelected ? "border border-blue-400" : ""}
                    hover:bg-blue-100 dark:hover:bg-gray-800
                    text-gray-700 dark:text-gray-200`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day.getDate()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Time Picker */}
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-gray-500 dark:text-gray-400" />
                        <input
                            type="time"
                            className="w-full px-2 py-1 border rounded-lg text-sm
              bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedDateTime ? selectedDateTime.split("T")[1] : "12:00"}
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
