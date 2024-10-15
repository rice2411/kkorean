import { Box, Heading, Svg } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { useModal } from "@/hooks";
import React, { useEffect, useState } from "react";

const BlankModal = ({ children, className, classContent }) => {
    const { modalBlank, handleModiferModalBlank } = useModal();
    const [data, setData] = useState(modalBlank);

    const handlelose = () => {
        handleModiferModalBlank({ isOpen: false });
    };

    useEffect(() => {
        setData(modalBlank);
    }, [modalBlank]);

    if (!data.isOpen) return null;

    return (
        <div
            onMouseDown={(e) => {
                if (e.target.id === "modal") handlelose();
            }}
            id="modal"
            className="absolute inset-0 bg-gray-300 bg-opacity-50 h-full flex items-center justify-center z-50 overflow-y-auto"
        >
            <div
                className={` ${className} relative p-4 w-full max-w-2xl h-full md:h-auto `}
            >
                {/* Modal Content */}
                <div
                    className={`relative p-4 bg-white rounded-lg shadow h-full sm:p-5 `}
                >
                    {/* Modal header */}
                    {data.title && (
                        <Box className="flex justify-between items-center pb-4 mb-4 rounded-t  border-b sm:mb-5 border-gray-600">
                            <Heading className="text-lg font-semibold text-gray-900">
                                {data.title}
                            </Heading>
                            <Box
                                onClick={handlelose}
                                type="button"
                                className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                data-modal-toggle="defaultModal"
                            >
                                <Svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    src={FileHelpers.getLocalFile(
                                        "close",
                                        "path"
                                    )}
                                ></Svg>
                            </Box>
                        </Box>
                    )}
                    {/* Scrollable content area */}
                    <div className={`${classContent} overflow-y-auto`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlankModal;
