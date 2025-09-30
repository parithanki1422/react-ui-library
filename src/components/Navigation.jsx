import { useState, useRef, useEffect } from "react";

export default function Navigation({ menu }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [hovering, setHovering] = useState(false);
    const menuRef = useRef(null); 

    const handleMouseEnter = (index) => {
        setHovering(true);
        setOpenMenu(index);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        setTimeout(() => {
            if (!hovering) setOpenMenu(null);
        }, 200);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            ref={menuRef}
            className="bg-blue-600 text-white shadow-md relative"
        >
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex gap-8 py-4 relative">
                    {menu.map((item, index) => (
                        <li
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="cursor-pointer hover:underline">{item.label}</span>

                            {item.children && openMenu === index && (
                                <div
                                    className="absolute left-0 top-full bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg mt-2 p-6 rounded-md z-50 min-w-[400px] max-w-[900px] flex gap-6 flex-wrap"
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                >
                                    {item.children.map((section) => (
                                        <div key={section.label} className="min-w-[160px]">
                                            <h4 className="font-bold mb-2">{section.label}</h4>
                                            <ul className="space-y-1">
                                                {section.items.map((child) => (
                                                    <li key={child.label}>
                                                        <a
                                                            href={child.href}
                                                            className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                                        >
                                                            {child.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
