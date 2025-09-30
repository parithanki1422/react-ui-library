export default function Select({ label, options, value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-gray-700 dark:text-white">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg px-3 py-2 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    w-full"
            >
                <option value="">Select...</option>
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
