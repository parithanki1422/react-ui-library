import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Form({ fields = [], onSubmit }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e, field) => {
        const { name, value, type, checked } = e.target;

        let newValue = value;
        if (type === "checkbox" && !field.options) {
            newValue = checked;
        }
        if (type === "checkbox" && field.options) {
            const prev = formData[name] || [];
            newValue = checked
                ? [...prev, value]
                : prev.filter((v) => v !== value);
        }

        setFormData({ ...formData, [name]: newValue });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        let newErrors = {};
        fields.forEach((field) => {
            const value = formData[field.name];
            if (field.required && !value) {
                newErrors[field.name] = `${field.label || field.name} is required`;
            }
            if (field.type === "email" && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors[field.name] = "Invalid email address";
                }
            }
            if (field.minLength && value && value.length < field.minLength) {
                newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
            }
            if (field.maxLength && value && value.length > field.maxLength) {
                newErrors[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800"
        >
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                    {field.label && !(field.type === "checkbox" && !field.options) && (
                        <label
                            htmlFor={field.name}
                            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}

                    {field.type === "textarea" ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field)}
                            className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none 
                                ${errors[field.name]
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
                                dark:bg-gray-700 dark:text-white`}
                        />
                    ) : field.type === "select" ? (
                        <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field)}
                            className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none 
                                ${errors[field.name]
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
                                dark:bg-gray-700 dark:text-white`}
                        >
                            <option value="">Select...</option>
                            {field.options?.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : field.type === "radio" ? (
                        <div className="flex gap-4">
                            {field.options?.map((opt) => (
                                <label key={opt} className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={opt}
                                        checked={formData[field.name] === opt}
                                        onChange={(e) => handleChange(e, field)}
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    ) : field.type === "checkbox" && field.options ? (
                        <div className="flex flex-wrap gap-4">
                            {field.options?.map((opt) => (
                                <label key={opt} className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        value={opt}
                                        checked={(formData[field.name] || []).includes(opt)}
                                        onChange={(e) => handleChange(e, field)}
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    ) : field.type === "checkbox" ? (
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={field.name}
                                name={field.name}
                                checked={formData[field.name] || false}
                                onChange={(e) => handleChange(e, field)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {field.label}
                            </span>
                        </label>
                    ) : field.type === "password" ? (
                        <div className="relative">
                            <input
                                id={field.name}
                                type={showPassword ? "text" : "password"}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name] || ""}
                                onChange={(e) => handleChange(e, field)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none 
                                    ${errors[field.name]
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
                                    dark:bg-gray-700 dark:text-white`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    ) : (
                        <input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field)}
                            className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none 
                                ${errors[field.name]
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
                                dark:bg-gray-700 dark:text-white`}
                        />
                    )}

                    {errors[field.name] && (
                        <span className="text-xs text-red-500 mt-1">{errors[field.name]}</span>
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </form>
    );
}
