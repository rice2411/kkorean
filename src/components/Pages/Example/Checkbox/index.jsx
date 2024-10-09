import React, { useState } from "react";
import { Checkbox } from "@/components/Atoms";

const CheckboxExample = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Checkbox Example</h1>

            {/* Default Checkbox */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Default Checkbox</h2>
                <Checkbox
                    label="I agree to the terms and conditions"
                    checked={isChecked}
                    onChange={handleChange}
                />
            </div>

            {/* Disabled Checkbox */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Disabled Checkbox
                </h2>
                <Checkbox
                    label="I am disabled"
                    checked={false}
                    onChange={() => {}}
                    disabled
                />
            </div>
        </div>
    );
};

export default CheckboxExample;
