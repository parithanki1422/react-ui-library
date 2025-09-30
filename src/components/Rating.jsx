import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Rating({ value = 0, max = 5, onChange }) {
    const [hoverValue, setHoverValue] = useState(null);

    const displayValue = hoverValue !== null ? hoverValue : value;

    const handleClick = (newValue) => {
        if (value === newValue) {
            if (newValue === max) {
                onChange(newValue - 1);
            } else {
                onChange(newValue - 0.5 >= 0 ? newValue - 0.5 : 0);
            }
        } else {
            onChange(newValue);
        }
    };

    return (
        <div className="flex space-x-1">
            {Array.from({ length: max }).map((_, i) => {
                const fullValue = i + 1;
                const halfValue = i + 0.5;

                let icon;
                if (displayValue >= fullValue) {
                    icon = (
                        <FontAwesomeIcon
                            icon={solidHeart}
                            className="w-6 h-6 text-red-500 dark:text-red-400"
                        />
                    );
                } else if (displayValue >= halfValue) {
                    icon = (
                        <div className="relative w-6 h-6">
                            <FontAwesomeIcon
                                icon={regularHeart}
                                className="absolute inset-0 w-6 h-6 text-gray-400 dark:text-gray-600"
                            />
                            <div className="absolute inset-0 w-1/2 overflow-hidden">
                                <FontAwesomeIcon
                                    icon={solidHeart}
                                    className="w-6 h-6 text-red-500 dark:text-red-400"
                                />
                            </div>
                        </div>
                    );
                } else {
                    icon = (
                        <FontAwesomeIcon
                            icon={regularHeart}
                            className="w-6 h-6 text-gray-400 dark:text-gray-600"
                        />
                    );
                }

                return (
                    <div
                        key={i}
                        className="relative cursor-pointer"
                        onMouseEnter={() => setHoverValue(fullValue)}
                        onMouseLeave={() => setHoverValue(null)}
                    >
                        <div
                            className="absolute left-0 top-0 w-1/2 h-full z-10"
                            onClick={() => handleClick(halfValue)}
                            onMouseEnter={() => setHoverValue(halfValue)}
                        />
                        <div
                            className="absolute right-0 top-0 w-1/2 h-full z-10"
                            onClick={() => handleClick(fullValue)}
                            onMouseEnter={() => setHoverValue(fullValue)}
                        />
                        {icon}
                    </div>
                );
            })}
        </div>
    );
}
