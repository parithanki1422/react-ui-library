export default function Timeline({ events = [] }) {
    return (
        <div className="relative ml-6">
            <div className="absolute left-3 top-0 w-1 h-full bg-blue-500"></div>

            {events.map((event, idx) => (
                <div key={idx} className="mb-8 relative pl-2">
                    <div className="absolute left-3 top-4 w-4 h-1 bg-blue-500"></div>

                    <div className="ml-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                        {event.time && (
                            <time className="block text-gray-500 text-sm mb-1 dark:text-gray-400">
                                {event.time}
                            </time>
                        )}
                        <p className="text-gray-700 dark:text-gray-200">{event.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
