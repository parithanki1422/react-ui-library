export default function Input({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-gray-700 dark:text-white">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg px-3 py-2 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition w-full"
            />
        </div>
    );
}
