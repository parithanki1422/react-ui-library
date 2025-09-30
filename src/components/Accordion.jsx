import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border rounded-md overflow-hidden mb-2">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left font-medium px-4 py-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center"
            >
                {title}
                <FontAwesomeIcon icon={open ? faMinus : faPlus} />
            </button>
            {open && (
                <div className="p-4 bg-white dark:bg-gray-800 transition-all">
                    {children}
                </div>
            )}
        </div>
    );
}
