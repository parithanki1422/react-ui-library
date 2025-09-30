export default function Toggle({ label, checked, onChange }) {
    return (
        <div className="flex items-center gap-3">
            {label && (
                <span className="text-gray-700 dark:text-gray-300">{label}</span>
            )}
            <button
                onClick={() => onChange(!checked)}
                className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${checked ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"
                    }`}
            >
                <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${checked ? "translate-x-6" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}
