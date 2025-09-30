import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function MultiSelect({ options = [], onChange, label }) {
    const [selected, setSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOption = (option) => {
        const updated = selected.includes(option)
            ? selected.filter((o) => o !== option)
            : [...selected, option];
        setSelected(updated);
        if (onChange) onChange(updated);
    };

    const removeOption = (option) => {
        const updated = selected.filter((o) => o !== option);
        setSelected(updated);
        if (onChange) onChange(updated);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full max-w-sm relative" ref={dropdownRef}>
            {label && <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>}

            <div
                className="border rounded-lg p-2 flex flex-wrap items-center gap-1 cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm hover:border-blue-500 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected.length > 0 ? (
                    selected.map((item) => (
                        <span
                            key={item}
                            className="flex items-center gap-1 bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white px-2 py-1 rounded-full text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeOption(item);
                            }}
                        >
                            {item}
                            <FontAwesomeIcon icon={faTimes} className="text-xs cursor-pointer" />
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 text-sm">Select options...</span>
                )}
                <FontAwesomeIcon icon={faChevronDown} className="ml-auto text-gray-400" />
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full border rounded-lg bg-white dark:bg-gray-800 shadow-lg max-h-52 overflow-auto">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => toggleOption(option)}
                            className={`px-4 py-2 cursor-pointer flex justify-between items-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${selected.includes(option) ? "bg-blue-50 dark:bg-gray-700" : ""}`}
                        >
                            <span className="text-sm">{option}</span>
                            {selected.includes(option) && (
                                <FontAwesomeIcon icon={faCheck} className="text-blue-600" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
