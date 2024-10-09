import React, { useState } from "react";
import { Label } from "@/components/Atoms";

const LabelExample = () => {
    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Form Example</h1>
            <div className="mb-4">
                <Label text="Name" htmlFor="name" required={true} />
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
        </div>
    );
};

export default LabelExample;
