import { useState } from "react";

export default function Modal({ triggerLabel, title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                {triggerLabel}
            </button>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">{title}</h2>
                        <div className="mb-4">{children}</div>
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
