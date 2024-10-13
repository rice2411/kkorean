import React from "react";
import { Tooltip } from "@/components/Atoms"; // Đảm bảo đường dẫn này là chính xác

const TooltipExample = () => {
    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Tooltip Example</h1>

            <div className="flex space-x-4">
                {/* Tooltip ở trên */}
                <Tooltip text="Tooltip ở trên" position="top">
                    <button className="px-4 py-2 text-white bg-blue-500 rounded">
                        Nút 1
                    </button>
                </Tooltip>

                {/* Tooltip ở dưới */}
                <Tooltip text="Tooltip ở dưới" position="bottom">
                    <button className="px-4 py-2 text-white bg-green-500 rounded">
                        Nút 2
                    </button>
                </Tooltip>

                {/* Tooltip ở bên trái */}
                <Tooltip text="Tooltip ở trái" position="left">
                    <button className="px-4 py-2 text-white bg-red-500 rounded">
                        Nút 3
                    </button>
                </Tooltip>

                {/* Tooltip ở bên phải */}
                <Tooltip text="Tooltip ở phải" position="right">
                    <button className="px-4 py-2 text-white bg-purple-500 rounded">
                        Nút 4
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default TooltipExample;
