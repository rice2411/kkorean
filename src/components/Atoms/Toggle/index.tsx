import React from "react";

interface ToggleProps {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    label: string;
}

const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    disabled = false,
    label,
}) => {
    return (
        <div className="flex items-center">
            <span className="mr-2 text-lg">{label}</span>
            <button
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${
                    checked ? "bg-primary" : "bg-gray-300"
                } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={!disabled ? onChange : undefined}
                disabled={disabled}
            >
                <span
                    className={`inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out ${
                        checked
                            ? "translate-x-5 bg-white"
                            : "translate-x-1 bg-white"
                    }`}
                />
            </button>
        </div>
    );
};

export default Toggle;
