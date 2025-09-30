export function PrimaryButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-800 text-white 
                 px-4 py-2 rounded-lg font-medium shadow transition-colors duration-150"
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-800 
                 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-150"
        >
            {children}
        </button>
    );
}
