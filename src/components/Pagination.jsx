export default function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "bg-blue-500 text-white" : " dark:bg-gray-600 bg-gray-200"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
