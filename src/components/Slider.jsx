export default function Slider({ label, min = 0, max = 100, step = 1, value, onChange }) {
    return (
        <div className="flex flex-col space-y-2">
            {label && <span className="font-medium text-gray-700 dark:text-gray-300">{label}: {value}</span>}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange && onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
          dark:bg-gray-700
          accent-blue-600"
            />
        </div>
    );
}
