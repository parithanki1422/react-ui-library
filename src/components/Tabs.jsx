import { useState } from "react";

export default function Tabs({ tabs }) {
    const [active, setActive] = useState(0);
    return (
        <div>
            <div className="flex border-b mb-2">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`px-4 py-2 -mb-px border-b-2 ${active === i ? "border-blue-600 font-bold" : "border-transparent"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>{tabs[active].content}</div>
        </div>
    );
}
