export default function ListGroup({ items = [], onSelect, selected }) {
    return (
        <ul className="w-full border rounded-lg divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-700">
            {items.map((item, idx) => (
                <li
                    key={idx}
                    onClick={() => onSelect?.(item)}
                    className={`px-4 py-2 cursor-pointer transition-colors 
            ${selected === item
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        }`}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
