import React from "react";

interface ButtonVariants {
    primary: "primary";
    "primary-outline": "primary-outline";
    secondary: "secondary";
    "secondary-outline": "secondary-outline";
    warning: "warning";
    "warning-outline": "warning-outline";
    success: "success";
    "success-outline": "success-outline";
    danger: "danger";
    "danger-outline": "danger-outline";
}

interface ButtonSizes {
    small: "small";
    medium: "medium";
    large: "large";
}

type Variant = keyof ButtonVariants;
type Size = keyof ButtonSizes;

interface ButtonProps {
    variant?: Variant;
    size?: Size;
    onClick?: () => void | null;
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "medium",
    onClick,
    children,
    disabled = false,
    loading = false,
    icon,
    className = "",
    hover = false,
}) => {
    const baseClass =
        "flex items-center justify-center font-semibold focus:outline-none transition duration-200";

    const variantClass: Record<Variant, string> = {
        primary: "bg-primary-500 text-white",
        "primary-outline": "border border-primary-500 text-primary-500",
        secondary: "bg-secondary text-white",
        "secondary-outline": "border border-secondary text-secondary",
        warning: "bg-warning text-white",
        "warning-outline": "border border-warning text-warning",
        success: "bg-success text-white",
        "success-outline": "border border-success text-success",
        danger: "bg-danger text-white",
        "danger-outline": "border border-danger text-danger",
    };

    const hoverClass: Record<Variant, string> = {
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
    };

    const sizeClass: Record<Size, string> = {
        small: "px-3 py-1 text-sm rounded-md",
        medium: "px-4 py-2 text-base rounded-lg",
        large: "px-6 py-3 text-lg rounded-xl",
    };

    const loadingClass =
        loading || disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            className={`${className} ${baseClass} ${variantClass[variant]} ${
                sizeClass[size]
            } ${loadingClass} ${hover ? hoverClass[variant] : ""} `}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && <span className="loader mr-2">Loading...</span>}
            {icon && <span className="icon mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
