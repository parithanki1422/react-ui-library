export default function Avatar({ src, alt, size = "12" }) {
  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
          {alt?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
