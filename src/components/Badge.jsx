export default function Badge({ children, color = "red" }) {
    const colors = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500",
        gray: "bg-gray-500",
    };

    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white ${colors[color] || colors.red}`}
        >
            {children}
        </span>
    );
}
