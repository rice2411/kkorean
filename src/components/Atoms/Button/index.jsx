import React from "react";
import PropTypes from "prop-types";

const Button = ({
    variant,
    size = "medium",
    onClick,
    children,
    disabled = false,
    loading = false,
    icon,
    className = "", // Thêm thuộc tính className
    hover = false,
}) => {
    const baseClass =
        "flex items-center justify-center font-semibold focus:outline-none transition duration-200";

    const variantClass = {
        primary: "bg-primary-500 text-white",
        "primary-outline": "border border-primaryprimary-500 text-primary-500",
        secondary: "bg-secondary text-white",
        "secondary-outline": "border border-secondary text-secondary",
        warning: "bg-warning text-white",
        "warning-outline": "border border-warning text-warning",
        success: "bg-success text-white",
        "success-outline": "border border-success text-success",
        danger: "bg-danger text-white",
        "danger-outline": "border border-danger text-danger",
    }[variant];

    const hoverClass = {
        primary: "hover:bg-primary-400",
        "primary-outline": "hover:bg-primary-400 hover:text-white",
        secondary: "hover:bg-secondary-dark",
        "secondary-outline": "hover:bg-secondary hover:text-white",
        warning: "hover:bg-warning-dark",
        "warning-outline": "hover:bg-warning hover:text-white",
        success: "hover:bg-success-dark",
        "success-outline": "hover:bg-success hover:text-white",
        danger: "hover:bg-danger-dark",
        "danger-outline": "hover:bg-danger hover:text-white",
    }[variant];

    const sizeClass = {
        small: "px-3 py-1 text-sm rounded-md",
        medium: "px-4 py-2 text-base rounded-lg",
        large: "px-6 py-3 text-lg rounded-xl",
    }[size];

    const loadingClass =
        loading || disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${
                hover && hoverClass
            } ${className}`} // Kết hợp với className tùy chỉnh
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && <span className="loader mr-2">Loading...</span>}
            {icon && <span className="icon mr-2">{icon}</span>}
            {children}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf([
        "primary",
        "primary-outline",
        "secondary",
        "secondary-outline",
        "warning",
        "warning-outline",
        "success",
        "success-outline",
        "danger",
        "danger-outline",
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.node,
    className: PropTypes.string, // Định nghĩa propTypes cho className
};

export default Button;
