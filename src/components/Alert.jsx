export default function Alert({ type = "info", message }) {
    const styles = {
        info: "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
        success: "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
        warning: "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700",
        error: "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
    };

    return (
        <div className={`p-4 rounded-md ${styles[type]}`}>
            {message}
        </div>
    );
}
