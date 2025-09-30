import { useState } from "react";

export default function RadioGroup({ label, options = [], value, onChange }) {
    return (
        <div className="flex flex-col space-y-2">
            {label && <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>}
            <div className="flex gap-4">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            className="form-radio text-blue-600 dark:text-blue-400"
                            name={label}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange && onChange(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
