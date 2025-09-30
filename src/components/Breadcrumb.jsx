export default function Breadcrumb({ items }) {
    return (
        <nav className="flex text-md font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1">
                {items.map((item, idx) => (
                    <li key={idx} className="inline-flex items-center">
                        {item.href && idx !== items.length - 1 ? (
                            <a
                                href={item.href}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">
                                {item.label}
                            </span>
                        )}

                        {idx < items.length - 1 && (
                            <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
