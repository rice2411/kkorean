import { IBase } from "@/interface";
import React from "react";

interface SelectProps {
  options: IBase.BaseOptions[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  size?: "small" | "default" | "large";
  disabled?: boolean;
  helperText?: string;
  name?: string;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  size = "default",
  disabled = false,
  helperText = "",
  name = "",
  placeholder = "",
  className = " ",
}) => {
  const sizeClasses = {
    small: "p-1 text-sm",
    default: "p-2 text-base",
    large: "p-3 text-lg",
  };

  return (
    <div className="mb-4">
      <select
        name={name}
        className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${
          sizeClasses[size]
        } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option key={"default"} value={"default"} disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Select;
