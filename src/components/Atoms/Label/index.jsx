import React from "react";
import PropTypes from "prop-types";

const Label = ({
    text,
    htmlFor,
    required = false,
    disabled = false,
    className,
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-medium mb-1 ${
                disabled ? "text-gray-500" : "text-gray-900"
            } ${className}`}
        >
            {text}
            {required && <span className="text-red-500 ml-1">*</span>}{" "}
            {/* Hiển thị dấu sao nếu yêu cầu */}
        </label>
    );
};

export default Label;
