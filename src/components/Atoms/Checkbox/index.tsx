import React, { useState } from "react";

interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange: (param: { value: string; isChecked: boolean }) => void;
    disabled?: boolean;
    className?: string;
    value: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    disabled = false,
    className,
    onChange,
    value,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                className={`h-3 w-3 border-gray-300 rounded focus:ring-2 focus:ring-primary ${
                    isChecked ? "bg-primary text-white" : "bg-white"
                } ${disabled ? "cursor-not-allowed" : ""}`}
                checked={isChecked}
                onChange={() => {
                    setIsChecked(!isChecked);
                    onChange({ value, isChecked: !isChecked });
                }}
                disabled={disabled}
                id={label} // Thêm thuộc tính id để kết nối với label
            />
            <label
                htmlFor={label} // Sử dụng htmlFor để cải thiện khả năng truy cập
                className={`ml-2 cursor-pointer text-xs ${
                    disabled ? "text-gray-500 cursor-not-allowed" : ""
                }`}
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
