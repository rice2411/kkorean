import React from "react";

interface LabelProps {
    text: string;
    htmlFor?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const Label: React.FC<LabelProps> = ({
    text,
    htmlFor,
    required = false,
    disabled = false,
    className = "",
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-medium mb-1 ${
                disabled ? "text-gray-500" : "text-gray-900"
            } ${className}`}
        >
            {text}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export default Label;
