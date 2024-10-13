import React, { useState } from "react";
import { RadioButton } from "@/components/Atoms";

const RadioButtonExample = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Radio Button Example</h1>

            {/* Radio Buttons */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Choose an option</h2>
                <RadioButton
                    label="Option 1"
                    checked={selectedOption === "option1"}
                    onChange={handleChange}
                    value="option1"
                    name="radioGroup"
                />
                <RadioButton
                    label="Option 2"
                    checked={selectedOption === "option2"}
                    onChange={handleChange}
                    value="option2"
                    name="radioGroup"
                />
                <RadioButton
                    label="Option 3"
                    checked={selectedOption === "option3"}
                    onChange={handleChange}
                    value="option3"
                    name="radioGroup"
                />
            </div>

            {/* Disabled Radio Button */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Disabled Radio Button
                </h2>
                <RadioButton
                    label="I am disabled"
                    checked={false}
                    onChange={() => {}}
                    disabled
                    value="option3"
                    name="radioGroup"
                />
            </div>
        </div>
    );
};

export default RadioButtonExample;
