import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, checked, onChange, disabled = false }) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                className={`h-4 w-4 border-gray-300 rounded focus:ring-2 focus:ring-primary ${
                    checked ? "bg-primary text-white" : "bg-white"
                } ${disabled ? "cursor-not-allowed" : ""}`}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label
                className={`ml-2 cursor-pointer ${
                    disabled ? "text-gray-500 cursor-not-allowed" : ""
                }`}
                onClick={!disabled ? onChange : undefined}
            >
                {label}
            </label>
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default Checkbox;
