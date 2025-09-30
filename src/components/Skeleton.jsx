export default function Skeleton({ width = "w-full", height = "h-4" }) {
    return (
        <div className={`animate-pulse bg-gray-300 dark:bg-gray-500 rounded ${width} ${height}`} />
    );
}
