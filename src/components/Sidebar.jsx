import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ links, darkMode }) {
    return (
        <aside
            className={`w-64 h-screen p-4 shadow-lg transition-colors duration-300 
        ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
        >
            <ul className="space-y-2">
                {links.map((link) => (
                    <LeftbarItem key={link.label} item={link} level={0} darkMode={darkMode} />
                ))}
            </ul>
        </aside>
    );
}

function LeftbarItem({ item, level }) {
    const [open, setOpen] = useState(false);

    return (
        <li>
            <div
                className={`
                    flex items-center justify-between 
                    cursor-pointer font-medium 
                    px-3 py-2 rounded-md
                    hover:bg-blue-100 hover:text-blue-700
                    transition-colors duration-200
                `}
                style={{ marginLeft: level * 16 }}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{item.label}</span>
                {item.children && (
                    <FontAwesomeIcon
                        icon={open ? faChevronDown : faChevronRight}
                        className="text-gray-600"
                    />
                )}
            </div>

            {item.children && open && (
                <ul className="mt-1 border-l border-gray-300 pl-2 space-y-1">
                    {item.children.map((child) => (
                        <LeftbarItem key={child.label} item={child} level={level + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
}
