import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({
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
                        ? () => onChange({ target: { value } })
                        : undefined
                }
            >
                {label}
            </label>
        </div>
    );
};

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default RadioButton;
