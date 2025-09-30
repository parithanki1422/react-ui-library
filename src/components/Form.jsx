import { useState } from "react";

export default function Form({ fields = [], onSubmit }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e, field) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validate = () => {
        let newErrors = {};
        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label || field.name} is required`;
            }
            if (field.type === "email" && formData[field.name]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[field.name])) {
                    newErrors[field.name] = "Invalid email address";
                }
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
            className="space-y-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800"
        >
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                    {field.label && (
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
                    ) : (
                        <input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            checked={field.type === "checkbox" ? formData[field.name] || false : undefined}
                            value={field.type !== "checkbox" ? formData[field.name] || "" : undefined}
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
