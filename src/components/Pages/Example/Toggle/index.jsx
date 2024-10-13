import React, { useState } from "react";
import { Toggle } from "@/components/Atoms";

const ToggleExample = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggleChange = () => {
        setIsToggled((prev) => !prev);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Toggle Example</h1>
            <Toggle
                checked={isToggled}
                onChange={handleToggleChange}
                disabled={false}
                label={isToggled ? "Toggle is ON" : "Toggle is OFF"} // Truyền label vào đây
            />
        </div>
    );
};

export default ToggleExample;
