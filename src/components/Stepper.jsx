import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Stepper({ steps = [], currentStep = 1 }) {
  const progressPercent =
    steps.length > 1
      ? ((currentStep - 1) / (steps.length - 1)) * 100
      : 0;

  return (
    <div className="w-full relative">
      <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300 dark:bg-gray-700 rounded z-0">
        <div
          className="h-1 bg-blue-600 rounded transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="flex justify-between relative z-10">
        {steps.map((step, idx) => {
          const completed = idx + 1 < currentStep;
          const active = idx + 1 === currentStep;

          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors
                  ${completed
                    ? "bg-blue-600 border-blue-600 text-white"
                    : active
                      ? "border-blue-600 bg-white dark:bg-gray-900 text-blue-600"
                      : "border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 text-gray-400"
                  }`}
              >
                {completed ? <FontAwesomeIcon icon={faCheck} /> : idx + 1}
              </div>

              <span
                className={`mt-2 text-xs font-medium
                  ${active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
              >
                {typeof step === "string" ? step : step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
