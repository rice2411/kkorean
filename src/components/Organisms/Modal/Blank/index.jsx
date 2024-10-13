import { Box, Heading } from "@/components/Atoms";
import useModal from "@/hooks/useModal";
import React, { useEffect, useState } from "react";

const BlankModal = ({ children }) => {
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
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* Modal Content */}
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    {/* Modal header */}
                    {data.title && (
                        <Box className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                            <Heading className="text-lg font-semibold text-gray-900">
                                {data.title}
                            </Heading>
                            <Box
                                onClick={handlelose}
                                type="button"
                                className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                data-modal-toggle="defaultModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </Box>
                        </Box>
                    )}
                    {/* Scrollable content area */}
                    <div className="max-h-96 overflow-y-auto">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default BlankModal;
