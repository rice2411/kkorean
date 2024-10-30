// Input.tsx
import React from "react";
import { Image } from "@/components/Atoms";
import Box from "../Box";

interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "default" | "large";
  disabled?: boolean;
  status?: "success" | "error" | "default";
  helperText?: string;
  icon?: string | null;
  iconPosition?: "left" | "right";
  onIconClick?: () => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id = "",
      name = "",
      type = "text",
      placeholder = "",
      value,
      onChange = () => {},
      size = "default",
      disabled = false,
      status = "default",
      helperText = "",
      icon = null,
      iconPosition = "left",
      onIconClick = () => {},
      accept = "",
      multiple = false,
      className = "",
    },
    ref
  ) => {
    const sizeClasses: Record<string, string> = {
      small: "p-1 text-sm",
      default: "p-2 text-base",
      large: "p-3 text-lg",
    };

    const statusClasses: Record<string, string> = {
      success: "border-green-500",
      error: "border-red-500",
      default: "border-gray-300",
    };

    return (
      <>
        <Box className="relative w-full ">
          {icon && (
            <span
              className={`absolute inset-y-0 ${
                iconPosition === "left" ? "left-0" : "right-2"
              } flex items-center pl-3 cursor-pointer`}
              onClick={onIconClick}
            >
              <Image src={icon} alt="icon" className="h-5 w-5" />
            </span>
          )}
          <input
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ${
              sizeClasses[size]
            } ${statusClasses[status]} ${
              disabled ? "bg-gray-200 cursor-not-allowed" : "border-2"
            } ${
              icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""
            } ${className}`}
            id={id}
            type={type}
            placeholder={placeholder}
            value={type === "file" ? undefined : value}
            onChange={onChange}
            disabled={disabled}
            name={name}
            accept={accept}
            multiple={multiple}
            ref={ref}
          />
        </Box>
        {helperText && (
          <p
            className={`mt-1 text-sm ${
              status === "error" ? "text-red-500" : "text-gray-500"
            }`}
          >
            {helperText}
          </p>
        )}
      </>
    );
  }
);

export default Input;
