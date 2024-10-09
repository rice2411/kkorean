import React, { useId } from "react";
import { Button } from "@/components/Atoms";

const ButtonExample = () => {
    const handleClick = (label) => {
        alert(`Bạn đã nhấn nút ${label}`);
    };

    // Nhóm các nút theo màu sắc
    const colorButtons = [
        { label: "Primary", variant: "primary", size: "medium" },
        { label: "Secondary", variant: "secondary", size: "medium" },
        { label: "Warning", variant: "warning", size: "medium" },
        { label: "Success", variant: "success", size: "medium" },
        { label: "Danger", variant: "danger", size: "medium" },
    ];

    // Nhóm các nút theo kích cỡ
    const sizeButtons = [
        { label: "Small", variant: "primary", size: "small" },
        { label: "Medium", variant: "primary", size: "medium" },
        { label: "Large", variant: "primary", size: "large" },
    ];

    // Nhóm các nút với hiệu ứng hover
    const hoverButtons = [
        {
            label: "Hover Primary",
            variant: "primary",
            size: "medium",
            hover: true,
        },
        {
            label: "Hover Secondary",
            variant: "secondary",
            size: "medium",
            hover: true,
        },
    ];

    // Nhóm các nút disabled
    const disabledButtons = [
        {
            label: "Disabled Primary",
            variant: "primary",
            size: "medium",
            disabled: true,
        },
        {
            label: "Disabled Secondary",
            variant: "secondary",
            size: "medium",
            disabled: true,
        },
    ];

    // Nhóm các nút có icon
    const iconButtons = [
        {
            label: "Primary with Icon",
            variant: "primary",
            size: "medium",
            icon: "🔍",
        },
        {
            label: "Secondary with Icon",
            variant: "secondary",
            size: "medium",
            icon: "✔️",
        },
    ];

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Button Example</h1>

            {/* Nhóm nút theo màu sắc */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Color Buttons</h2>
                <div className="flex items-center flex-wrap">
                    {colorButtons.map((button) => (
                        <Button
                            key={useId()}
                            onClick={() => handleClick(button.label)}
                            variant={button.variant}
                            size={button.size}
                            className="ml-2 mb-2"
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Nhóm nút theo kích cỡ */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Size Buttons</h2>
                <div className="flex items-center flex-wrap">
                    {sizeButtons.map((button) => (
                        <Button
                            key={useId()}
                            onClick={() => handleClick(button.label)}
                            variant={button.variant}
                            size={button.size}
                            className="ml-2 mb-2"
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Nhóm nút với hiệu ứng hover */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Hover Buttons</h2>
                <div className="flex items-center flex-wrap">
                    {hoverButtons.map((button) => (
                        <Button
                            key={useId()}
                            onClick={() => handleClick(button.label)}
                            variant={button.variant}
                            size={button.size}
                            className="ml-2 mb-2"
                            hover={button.hover}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Nhóm nút disabled */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Disabled Buttons</h2>
                <div className="flex items-center flex-wrap">
                    {disabledButtons.map((button) => (
                        <Button
                            key={useId()}
                            onClick={() => handleClick(button.label)}
                            variant={button.variant}
                            size={button.size}
                            className="ml-2 mb-2"
                            disabled={button.disabled}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Nhóm nút có icon */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Icon Buttons</h2>
                <div className="flex items-center flex-wrap">
                    {iconButtons.map((button) => (
                        <Button
                            key={useId()}
                            onClick={() => handleClick(button.label)}
                            variant={button.variant}
                            size={button.size}
                            className="ml-2 mb-2"
                            icon={button.icon}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ButtonExample;
