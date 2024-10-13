import React, { useState } from "react";
import { Select } from "@/components/Atoms";

const SelectExample = () => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Select Example</h1>

            {/* Default Select */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Default Select</h2>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                />
            </div>

            {/* Size Select */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Size Select</h2>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                    size="small"
                />
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                    size="default"
                />
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                    size="large"
                />
            </div>

            {/* Disabled Select */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Disabled Select</h2>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                    disabled
                />
            </div>

            {/* Select with Helper Text */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Select with Helper Text
                </h2>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                    helperText="Please select an option."
                />
            </div>
        </div>
    );
};

export default SelectExample;
