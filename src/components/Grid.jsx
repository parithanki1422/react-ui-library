import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

export default function Grid({ columns, data }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "asc"
            ? aValue > bValue
                ? 1
                : -1
            : aValue < bValue
                ? 1
                : -1;
    });

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <table className="min-w-full border">
            <thead>
                <tr>
                    {columns.map((col) => {
                        const isActive = sortConfig.key === col.accessor;
                        return (
                            <th
                                key={col.accessor}
                                className="cursor-pointer p-2 border text-left"
                                onClick={() => handleSort(col.accessor)}
                            >
                                <div className="flex items-center gap-1">
                                    {col.label}
                                    <span className="flex flex-col leading-[0.8]">
                                        <FontAwesomeIcon
                                            icon={faSortUp}
                                            className={`text-[0.65rem] ${isActive && sortConfig.direction === "asc"
                                                    ? "text-blue-600"
                                                    : "text-gray-400"
                                                }`}
                                        />
                                        <FontAwesomeIcon
                                            icon={faSortDown}
                                            className={`text-[0.65rem] -mt-1 ${isActive && sortConfig.direction === "desc"
                                                    ? "text-blue-600"
                                                    : "text-gray-400"
                                                }`}
                                        />
                                    </span>
                                </div>
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col) => (
                            <td key={col.accessor} className="p-2 border">
                                {row[col.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
