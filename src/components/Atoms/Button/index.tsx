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
    primary: "bg-primary-400 text-white",
    "primary-outline": "border border-primary-500 text-primary-500",
    secondary: "bg-gray-500 text-white",
    "secondary-outline": "border border-gray-500 text-black",
    warning: "bg-yellow-500 text-white",
    "warning-outline": "border border-yellow-500 text-yellow-500",
    success: "bg-green-500 text-white",
    "success-outline": "border border-green-500 text-green-500",
    danger: "bg-red-500 text-white",
    "danger-outline": "border border-red-500 text-red-500",
  };

  const hoverClass: Record<Variant, string> = {
    primary: "hover:bg-primary-600",
    "primary-outline": "hover:bg-primary-500 hover:text-white",
    secondary: "hover:bg-gray-600",
    "secondary-outline": "hover:bg-gray-500 hover:text-white",
    warning: "hover:bg-yellow-600",
    "warning-outline": "hover:bg-yellow-500 hover:text-white",
    success: "hover:bg-green-600",
    "success-outline": "hover:bg-green-500 hover:text-white",
    danger: "hover:bg-red-600",
    "danger-outline": "hover:bg-red-500 hover:text-white",
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
      className={` ${baseClass} ${variantClass[variant]} ${
        sizeClass[size]
      } ${loadingClass} ${hover ? hoverClass[variant] : ""} ${className}`}
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
