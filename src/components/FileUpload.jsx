import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function FileUpload({ label = "Upload File", onChange }) {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            if (onChange) onChange(file);
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            {label && <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>}
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded cursor-pointer
        hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                <FontAwesomeIcon icon={faUpload} className="text-gray-600 dark:text-gray-300" />
                <span>{fileName || "Choose a file..."}</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
        </div>
    );
}
