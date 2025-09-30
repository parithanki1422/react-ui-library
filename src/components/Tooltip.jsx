import { useState } from "react";

export default function Tooltip({ label, children, position = "top" }) {
    const [visible, setVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}

            <div
                className={`
          absolute ${positionClasses[position]} 
          px-3 py-1 rounded-md text-sm text-white bg-black 
          opacity-0 scale-90 pointer-events-none 
          transform transition-all duration-150 
          ${visible ? "opacity-100 scale-100 pointer-events-auto" : ""}
          z-50
        `}
            >
                {label}
                <div
                    className={`
            absolute w-2 h-2 bg-black rotate-45 
            ${position === "top" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"}
            ${position === "bottom" && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"}
            ${position === "left" && "right-0 top-1/2 -translate-y-1/2 translate-x-1/2"}
            ${position === "right" && "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"}
          `}
                />
            </div>
        </div>
    );
}
