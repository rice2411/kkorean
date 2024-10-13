import React, { useState } from "react";
import { Input } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

const InputExample = () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [sizeValue, setSizeValue] = useState("");
    const [disabledValue, setDisabledValue] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [fileValue, setFileValue] = useState(null);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFileChange = (e) => {
        setFileValue(e.target.files[0]);
    };

    const handleIconClick = () => {
        alert("Icon clicked!"); // Thực hiện hành động khi icon được nhấn
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Input Example</h1>

            {/* Default Input */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Default Input</h2>
                <Input
                    placeholder="Enter text"
                    value={defaultValue}
                    onChange={handleChange(setDefaultValue)}
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="left" // Đặt biểu tượng ở bên trái
                    onIconClick={handleIconClick} // Thêm sự kiện click cho icon
                />
            </div>

            {/* Size Input */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Size Inputs</h2>
                <Input
                    placeholder="Small size"
                    value={sizeValue}
                    onChange={handleChange(setSizeValue)}
                    size="small"
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="left"
                    onIconClick={handleIconClick}
                />
                <Input
                    placeholder="Medium size"
                    value={sizeValue}
                    onChange={handleChange(setSizeValue)}
                    size="default"
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="right" // Đặt biểu tượng ở bên phải
                    onIconClick={handleIconClick}
                />
                <Input
                    placeholder="Large size"
                    value={sizeValue}
                    onChange={handleChange(setSizeValue)}
                    size="large"
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="left"
                    onIconClick={handleIconClick}
                />
            </div>

            {/* Disabled Input */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Disabled Inputs</h2>
                <Input
                    placeholder="You can't type here"
                    value={disabledValue}
                    onChange={handleChange(setDisabledValue)}
                    disabled
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="left"
                    onIconClick={handleIconClick}
                />
            </div>

            {/* Status Inputs */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Status Inputs</h2>
                <Input
                    placeholder="Success state"
                    value={statusValue}
                    onChange={handleChange(setStatusValue)}
                    status="success"
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="left"
                    onIconClick={handleIconClick}
                />
                <Input
                    placeholder="Error state"
                    value={statusValue}
                    onChange={handleChange(setStatusValue)}
                    status="error"
                    icon={FileHelpers.getLocalFile("close-eye", "svg")}
                    iconPosition="left"
                    onIconClick={handleIconClick}
                />
            </div>

            {/* File Input */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">File Input</h2>
                <Input type="file" onChange={handleFileChange} />
                {fileValue && (
                    <p className="mt-2 text-sm text-gray-500">
                        Selected file: {fileValue.name}
                    </p>
                )}
            </div>
        </div>
    );
};

export default InputExample;
