import React from "react";
import PropTypes from "prop-types";

const Select = ({
    options,
    value,
    onChange,
    size = "default",
    disabled = false,
    helperText = "",
    name = "",
    defaultValue = "",
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
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${
                    sizeClasses[size]
                } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <option key={"default"} value={"default"} selected disabled>
                    {defaultValue}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {helperText && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(["small", "default", "large"]),
    disabled: PropTypes.bool,
    helperText: PropTypes.string,
};

export default Select;
