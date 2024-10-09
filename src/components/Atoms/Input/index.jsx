import React from "react";
import PropTypes from "prop-types";
import { Image } from "@/components/Atoms";
import Box from "../Box";

const Input = ({
    name = "",
    type = "text",
    placeholder = "",
    value,
    onChange = () => {},
    size = "default",
    disabled = false,
    status = "default",
    helperText = "",
    icon = null, // Thêm prop cho icon
    iconPosition = "left", // Thêm prop cho vị trí icon
    onIconClick = () => {}, // Thêm prop cho sự kiện click icon
}) => {
    const sizeClasses = {
        small: "p-1 text-sm",
        default: "p-2 text-base",
        large: "p-3 text-lg",
    };

    const statusClasses = {
        success: "border-green-500",
        error: "border-red-500",
        default: "border-gray-300",
    };

    return (
        <Box>
            <div className="relative">
                {icon && (
                    <span
                        className={`absolute inset-y-0 ${
                            iconPosition === "left" ? "left-0" : "right-2"
                        } flex items-center pl-3 cursor-pointer`}
                        onClick={onIconClick} // Thêm sự kiện click cho icon
                    >
                        <Image src={icon} alt="icon" className="h-5 w-5" />
                    </span>
                )}
                <input
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full  p-2  " ${
                        sizeClasses[size]
                    } ${statusClasses[status]} ${
                        disabled ? "bg-gray-200 cursor-not-allowed" : "border-2"
                    } ${
                        icon
                            ? iconPosition === "left"
                                ? "pl-10"
                                : "pr-10"
                            : ""
                    }`}
                    type={type}
                    placeholder={placeholder}
                    value={type === "file" ? undefined : value}
                    onChange={onChange}
                    disabled={disabled}
                    name={name}
                />
            </div>
            {helperText && (
                <p
                    className={`mt-1 text-sm ${
                        status === "error" ? "text-red-500" : "text-gray-500"
                    }`}
                >
                    {helperText}
                </p>
            )}
        </Box>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(["small", "default", "large"]),
    disabled: PropTypes.bool,
    status: PropTypes.oneOf(["success", "error", "default"]),
    helperText: PropTypes.string,
    icon: PropTypes.string, // Định nghĩa propTypes cho icon là một chuỗi
    iconPosition: PropTypes.oneOf(["left", "right"]), // Định nghĩa vị trí của icon
    onIconClick: PropTypes.func, // Định nghĩa propTypes cho sự kiện click icon
};

export default Input;
