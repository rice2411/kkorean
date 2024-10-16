import React from "react";

interface RadioButtonProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    name: string;
    value: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    checked,
    onChange,
    disabled = false,
    name,
    value,
}) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="radio"
                className={`h-4 w-4 border-gray-300 rounded ${
                    checked ? "bg-primary text-white" : "bg-white"
                } ${disabled ? "cursor-not-allowed" : ""}`}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                name={name}
                value={value}
            />
            <label
                className={`ml-2 cursor-pointer ${
                    disabled ? "text-gray-500 cursor-not-allowed" : ""
                }`}
                onClick={
                    !disabled
                        ? () =>
                              onChange({
                                  target: { value },
                              } as React.ChangeEvent<HTMLInputElement>)
                        : undefined
                }
            >
                {label}
            </label>
        </div>
    );
};

export default RadioButton;
