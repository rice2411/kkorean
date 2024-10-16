import React from "react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    disabled = false,
}) => {
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!disabled) {
            onChange(event);
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                className={`h-4 w-4 border-gray-300 rounded focus:ring-2 focus:ring-primary ${
                    checked ? "bg-primary text-white" : "bg-white"
                } ${disabled ? "cursor-not-allowed" : ""}`}
                checked={checked}
                onChange={handleCheckboxChange}
                disabled={disabled}
                id={label} // Thêm thuộc tính id để kết nối với label
            />
            <label
                htmlFor={label} // Sử dụng htmlFor để cải thiện khả năng truy cập
                className={`ml-2 cursor-pointer ${
                    disabled ? "text-gray-500 cursor-not-allowed" : ""
                }`}
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
